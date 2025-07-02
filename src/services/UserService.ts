// Models
import { Team } from "../models/Team";
import { User, UserWithRelations } from "../models/User";
import { UserType } from "../models/UserType";
import { ExpenseType } from "../models/ExpenseType";
import { ExpenseStatus } from "../models/ExpenseStatus";

// Enums
import { USER_TYPE } from "../constants/user-types";

// Types
import { SessionType } from "../types/SessionType";
import { ModelObjectType } from "../types/ModelObjectType";

const getOptionMaps = (options: ModelObjectType[]) => {
  return options.map((option: any) => ({
    label: option.name,
    value: option.id,
  }));
};

// Linked with Route
const fetchProfile: (user: SessionType) => Promise<any> = async (user) => {
  const [ profile ] = await User
    .query()
    .select('id', 'name')
    .where("id", user.id)
    .withGraphFetched('[type]') as unknown as UserWithRelations[];
  const { type: role, ...rest } = profile;
  const types = await ExpenseType
    .query()
    .select('id', 'name')
    .orderBy('name', 'ASC');
  const statuses = await ExpenseStatus
    .query()
    .select('*');
  const adminRole = await UserType
    .query()
    .select('id', 'name')
    .where('name', USER_TYPE.ADMINISTRATOR);
  const approvers = await User
    .query()
    .select('id', 'name')
    .where('type_id', adminRole[0].id)
    .orderBy('name', 'ASC');
  const employeeRole = await UserType
    .query()
    .select('id', 'name')
    .where('name', USER_TYPE.EMPLOYEE);
  const requestors = await User
    .query()
    .select('id', 'name')
    .where('type_id', employeeRole[0].id)
    .orderBy('name', 'ASC');
  let teams = [];
  if (user.type === USER_TYPE.ADMINISTRATOR) {
    teams = await Team
      .query()
      .select('id', 'name')
      .orderBy('name');
  }
  else {
    const result = await User
      .query()
      .select('id')
      .where("id", user.id)
      .withGraphFetched('[teams]')
      .modifyGraph('teams', (builder) => {
        builder
          .select('id', 'name')
          .orderBy('name');
      }) as unknown as UserWithRelations[];
    teams = result[0].teams;
  }
  return {
    profile: {
      user: rest,
      role,
    },
    options: {
      types: getOptionMaps(types),
      statuses: getOptionMaps(statuses),
      approvers: getOptionMaps(approvers),
      requestors: getOptionMaps(requestors),
      teams: getOptionMaps(teams),
    },
  };
};

export const UserService = {
  fetchProfile,
};
