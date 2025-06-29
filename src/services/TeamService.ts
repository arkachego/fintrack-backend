// Models
import { Team } from "../models/Team";

const fetchTeams: () => Promise<Team[]> = async () => {
  return await Team
    .query()
    .select('*')
    .select(
      Team.relatedQuery('users')
        .count()
        .as('users')
    )
    .orderBy('name');
};

const fetchTeamUsers: (id: string) => Promise<Team[]> = async (id) => {
  return await Team
    .query()
    .select('*')
    .where("id", id)
    .withGraphFetched('[users]')
    .modifyGraph('users', (builder) => {
      builder
        .select('id', 'name', 'email', 'joined_at')
        .orderBy('name');
    })
    .orderBy('name');
};

export const TeamService = {
  fetchTeams,
  fetchTeamUsers,
};
