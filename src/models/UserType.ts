// Libraries
import { Model, RelationMappings } from '../utilities/app-database';

// Utilities
import { TABLE_NAME } from '../constants/table-names';

// Models
import { User } from './User';

export class UserType extends Model {

  static override get tableName(): string {
    return TABLE_NAME.USER_TYPE;
  };

  static override get relationMappings(): RelationMappings {
    return {
      expenses: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: `${TABLE_NAME.USER_TYPE}.id`,
          to: `${TABLE_NAME.USER}.type_id`,
        },
      },
    };
  };

};
