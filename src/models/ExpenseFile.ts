// Libraries
import { Model, RelationMappings } from '../utilities/app-database';

// Utilities
import { TABLE_NAME } from '../constants/table-names';

// Models
import { Expense } from './Expense';

export class ExpenseFile extends Model {

  id!: string;
  expense_id!: string;
  name!: string;
  type!: string;
  key!: string;
  
  static override get tableName(): string {
    return TABLE_NAME.EXPENSE_FILE;
  };

  static override get relationMappings(): RelationMappings {
    return {
      expenses: {
        relation: Model.BelongsToOneRelation,
        modelClass: Expense,
        join: {
          from: `${TABLE_NAME.EXPENSE_FILE}.expense_id`,
          to: `${TABLE_NAME.EXPENSE}.id`,
        },
      },
    };
  };

};
