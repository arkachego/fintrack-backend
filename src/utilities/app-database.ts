// Libraries
import { Model, RelationMappings } from 'objection';
import Knex from 'knex';
import type { Knex as KnexType } from 'knex';

// Constants
import { USER_TYPE } from "../constants/user-types";

// Utilities
import knexConfig from '../migrations/knexfile';

// Enums
import { Operator } from '../enums/OperatorEnum';

// Types
import { SessionType } from '../types/SessionType';
import { CriteriaType } from '../types/QueryType';

// Initialize Knex
const knex: KnexType = Knex(knexConfig[process.env.NODE_ENV || 'development']);

// Bind Objection to Knex
Model.knex(knex);

const appendCriteria = (
  user: SessionType,
  query: Knex.QueryBuilder,
  criteria: CriteriaType[]
): void => {
  if (!criteria || criteria.length === 0) return;
  for (let i = 0; i < criteria.length; i++) {
    const clause = i === 0 ? 'where' : 'andWhere';
    const { field, operator, reference } = criteria[i];
    if (operator === Operator.IN || operator === Operator.NOT_IN) {
      const arrayOperator = operator === Operator.NOT_IN ? 'NOT IN' : 'IN';
      query[clause](knex.raw(`?? ${arrayOperator} (?)`, [field, reference]));
    } else {
      query[clause](knex.raw(`?? ${operator} ?`, [field, reference]));
    }
  }
  if (user.type === USER_TYPE.EMPLOYEE) {
    query['andWhere'](knex.raw(`?? ${operator} ?`, ['requestor_id', user.id]));
  }
};

// Export
export { Model, RelationMappings, knex, appendCriteria };
