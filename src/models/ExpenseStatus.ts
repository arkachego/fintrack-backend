// Libraries
import { Model, RelationMappings } from '../utilities/app-database';

// Utilities
import { TABLE_NAME } from '../constants/table-names';

// Models
import { Expense } from './Expense';

export class ExpenseStatus extends Model {

  static override get tableName(): string {
    return TABLE_NAME.EXPENSE_STATUS;
  };

  static override get relationMappings(): RelationMappings {
    return {
      expenses: {
        relation: Model.HasManyRelation,
        modelClass: Expense,
        join: {
          from: `${TABLE_NAME.EXPENSE_STATUS}.id`,
          to: `${TABLE_NAME.EXPENSE}.status_id`,
        },
      },
    };
  };

};
