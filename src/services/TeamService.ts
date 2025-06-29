// Models
import { Team } from "../models/Team";

// Types
import { SelectType } from "../types/SelectType";

const fetchTeams: () => Promise<SelectType[]> = async () => {
  const teams = await Team.query().select('id', 'name');
  return teams.map((team) => ({
    value: team.id,
    label: team.name,
  }));
};

const createTeam = () => {

};

const updateTeam = () => {

};

const deleteTeam = () => {

};

export const TeamService = {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam,
};

