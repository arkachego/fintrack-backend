// Models
import { Team } from "../models/Team";
import { User } from "../models/User";
import { UserType } from "../models/UserType";

// Enums
import { USER_TYPE } from "../constants/user-types";

// Types
import { SessionType } from "../types/SessionType";

const fetchApprovers: () => Promise<User[]> = async () => {
  const approverType = await UserType
    .query()
    .select('id', 'name')
    .where('name', USER_TYPE.ADMINISTRATOR);
  return await User
    .query()
    .select('id', 'name', 'email', 'joined_at')
    .where('type_id', approverType[0].id)
    .orderBy('name');
};

const fetchRequestors: (user: SessionType) => Promise<User[]> = async (user) => {
  if (user.type === USER_TYPE.EMPLOYEE) {
    return [];
  }
  const approverType = await UserType
    .query()
    .select('id', 'name')
    .where('name', USER_TYPE.EMPLOYEE);
  return await User
    .query()
    .select('id', 'name', 'email', 'joined_at')
    .where('type_id', approverType[0].id)
    .orderBy('name');
};

const fetchTeams: (user: SessionType) => Promise<Team[]> = async (user) => {
  if (user.type === USER_TYPE.ADMINISTRATOR) {
    return await Team
      .query()
      .select('*')
      .select(
        Team.relatedQuery('users')
          .count()
          .as('users')
      )
      .orderBy('name');
  }
  const [{ teams }]= await User
    .query()
    .select('id')
    .where("id", user.id)
    .withGraphFetched('[teams]')
    .modifyGraph('teams', (builder) => {
      builder
        .select('id', 'name')
        .orderBy('name');
    });
  return teams;
};

export const UserService = {
  fetchApprovers,
  fetchRequestors,
  fetchTeams,
};
