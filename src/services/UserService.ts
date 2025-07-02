// Models
import { Team } from "../models/Team";
import { User, UserWithRelations } from "../models/User";
import { UserType } from "../models/UserType";

// Enums
import { USER_TYPE } from "../constants/user-types";

// Types
import { SessionType } from "../types/SessionType";

// Linked with Route
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

// Linked with Route
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

// Linked with Route
const fetchTeams: (user: SessionType) => Promise<{ id: string; name: string; }[]> = async (user) => {
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
    }) as unknown as UserWithRelations[];
  return teams;
};

export const UserService = {
  fetchApprovers,
  fetchRequestors,
  fetchTeams,
};
