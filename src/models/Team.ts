// Libraries
import { Model, RelationMappings } from '../utilities/app-database';

// Utilities
import { TABLE_NAME } from '../constants/table-names';

// Models
import { User } from './User';

export class Team extends Model {

  id!: string;
  name!: string;
  
  static override get tableName(): string {
    return TABLE_NAME.TEAM;
  };

  static override get relationMappings(): RelationMappings {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: `${TABLE_NAME.TEAM}.id`,
          through: {
            from: `${TABLE_NAME.USER_TEAM}.team_id`,
            to: `${TABLE_NAME.USER_TEAM}.user_id`,
          },
          to: `${TABLE_NAME.USER}.id`,
        },
      },
    };
  };

};
