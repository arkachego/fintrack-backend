// Libraries
import { Model, RelationMappings } from '../utilities/app-database';

// Utilities
import { TABLE_NAME } from '../constants/table-names';

// Models
import { Team } from './Team';
import { User } from './User';
import { ExpenseType } from './ExpenseType';
import { ExpenseStatus } from './ExpenseStatus';

export class Expense extends Model {

  static override get tableName(): string {
    return TABLE_NAME.EXPENSE;
  };

  static override get relationMappings(): RelationMappings {
    return {
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        join: {
          from: `${TABLE_NAME.EXPENSE}.team_id`,
          to: `${TABLE_NAME.TEAM}.id`,
        },
      },
      requestor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${TABLE_NAME.EXPENSE}.requestor_id`,
          to: `${TABLE_NAME.USER}.id`,
        },
      },
      approver: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${TABLE_NAME.EXPENSE}.approver_id`,
          to: `${TABLE_NAME.USER}.id`,
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: ExpenseType,
        join: {
          from: `${TABLE_NAME.EXPENSE}.type_id`,
          to: `${TABLE_NAME.EXPENSE_TYPE}.id`,
        },
      },
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: ExpenseStatus,
        join: {
          from: `${TABLE_NAME.EXPENSE}.status_id`,
          to: `${TABLE_NAME.EXPENSE_STATUS}.id`,
        },
      },
    };
  };

};
