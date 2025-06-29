// Models
import { User } from "../models/User";
import { UserType } from "../models/UserType";

const fetchUsers: (type_id: string) => Promise<User[]> = async (type_id) => {
  return await User
    .query()
    .select('id', 'name', 'email', 'joined_at')
    .select(
      User.relatedQuery('teams')
        .count()
        .as('teams')
    )
    .where("type_id", type_id)
    .orderBy('name');
};

const fetchUserTypes: () => Promise<UserType[]> = async () => {
  return await UserType
    .query()
    .select('*')
    .orderBy('name');
};

const fetchUserTeams: (id: string) => Promise<UserType[]> = async (id) => {
  return await User
    .query()
    .select('id', 'name', 'email', 'joined_at')
    .where("id", id)
    .withGraphFetched('[teams]')
    .modifyGraph('teams', (builder) => {
      builder
        .orderBy('name');
    })
    .orderBy('name');
};

export const UserService = {
  fetchUsers,
  fetchUserTypes,
  fetchUserTeams,
};
