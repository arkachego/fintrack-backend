// Libraries
import { QueryBuilder } from 'objection';

// Models
import { Expense } from "../models/Expense";
import { ExpenseType } from "../models/ExpenseType";
import { ExpenseStatus } from "../models/ExpenseStatus";

// Enums
import { Operator } from '../enums/OperatorEnum';

// Types
import { QueryType, SegmentType, CriteriaType } from "../types/QueryType";

// Utilities
import { Model, knex } from "../utilities/app-database";

const appendCriteria = <T extends Model>(
  query: QueryBuilder<T>,
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
};

const fetchExpenseTypes: () => Promise<ExpenseType[]> = async () => {
  return await ExpenseType
    .query()
    .select('*')
    .orderBy('name');
};

const fetchExpenseStatuses: () => Promise<ExpenseStatus[]> = async () => {
  return await ExpenseStatus
    .query()
    .select('*');
};

const countExpenses: (query: QueryType) => Promise<Expense[]> = async ({ criteria }) => {
  const query = Expense
    .query()
    .count('*');
  appendCriteria(query, criteria);
  return await query;
};

const searchExpenses: (query: QueryType) => Promise<Expense[]> = async ({ segment, criteria }) => {
  const query = Expense
    .query()
    .select(
      'id',
      'name',
      'details',
      'amount',
      'requested_at',
      'approved_at',
      'rejected_at',
    );
  appendCriteria(query, criteria);
  const querySegment: SegmentType = segment || {
    page: 1,
    item: 20,
  };
  query
    .withGraphFetched('[team,requestor,approver,type,status]')
    .modifyGraph('requestor', (builder) => {
      builder
        .select('id', 'name');
    })
    .modifyGraph('approver', (builder) => {
      builder
        .select('id', 'name');
    })
    .orderBy('requested_at', 'DESC')
    .offset((querySegment.page - 1) * querySegment.item)
    .limit(querySegment.item);
  return await query;
};

export const ExpenseService = {
  fetchExpenseTypes,
  fetchExpenseStatuses,
  countExpenses,
  searchExpenses,
};
