// Libraries
import { Model, RelationMappings } from '../utilities/app-database';

// Utilities
import { TABLE_NAME } from '../constants/table-names';

// Models
import { Team } from './Team';
import { UserType } from './UserType';

export class User extends Model {

  id!: string;
  type_id!: string;
  name!: string;
  email!: string;
  password!: string;
  joined_at!: string;

  static override get tableName(): string {
    return TABLE_NAME.USER;
  };

  static override get relationMappings(): RelationMappings {
    return {
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserType,
        join: {
          from: `${TABLE_NAME.USER}.type_id`,
          to: `${TABLE_NAME.USER_TYPE}.id`,
        },
      },
      teams: {
        relation: Model.ManyToManyRelation,
        modelClass: Team,
        join: {
          from: `${TABLE_NAME.USER}.id`,
          through: {
            from: `${TABLE_NAME.USER_TEAM}.user_id`,
            to: `${TABLE_NAME.USER_TEAM}.team_id`,
          },
          to: `${TABLE_NAME.TEAM}.id`,
        },
      },
    };
  };

};

export interface UserWithRelations extends User {
  type: {
    id: string;
    name: string;
  };
  teams: {
    id: string;
    name: string;
  }[];
}