// Libraries
import { Model, RelationMappings } from '../utilities/app-database';

// Utilities
import { TABLE_NAME } from '../constants/table-names';

// Models
import { Team } from './Team';
import { User } from './User';

export class UserTeam extends Model {

  static override get tableName(): string {
    return TABLE_NAME.USER_TEAM;
  };

  static override get relationMappings(): RelationMappings {
    return {
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        join: {
          from: `${TABLE_NAME.USER_TEAM}.team_id`,
          to: `${TABLE_NAME.TEAM}.id`,
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${TABLE_NAME.USER_TEAM}.user_id`,
          to: `${TABLE_NAME.USER}.id`,
        },
      },
    };
  };

};
