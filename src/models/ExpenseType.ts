// Libraries
import { Model, RelationMappings } from '../utilities/app-database';

// Utilities
import { TABLE_NAME } from '../constants/table-names';

// Models
import { Expense } from './Expense';

export class ExpenseType extends Model {

  id!: string;
  name!: string;
  
  static override get tableName(): string {
    return TABLE_NAME.EXPENSE_TYPE;
  };

  static override get relationMappings(): RelationMappings {
    return {
      expenses: {
        relation: Model.HasManyRelation,
        modelClass: Expense,
        join: {
          from: `${TABLE_NAME.EXPENSE_TYPE}.id`,
          to: `${TABLE_NAME.EXPENSE}.type_id`,
        },
      },
    };
  };

};
