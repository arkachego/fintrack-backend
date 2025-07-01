// Libraries
import DayJS from 'dayjs';
import { QueryBuilder } from 'objection';

// Constants
import { EXPENSE_STATUS_TYPE } from '../constants/expense-status-types';

// Models
import { Expense } from "../models/Expense";
import { ExpenseType } from "../models/ExpenseType";
import { ExpenseStatus } from "../models/ExpenseStatus";

// Enums
import { Operator } from '../enums/OperatorEnum';

// Types
import { StatusType } from '../types/StatusType';
import { ExpensePayloadType } from '../types/ExpensePayloadType';
import { QueryType, SegmentType, CriteriaType } from "../types/QueryType";

// Utilities
import { Model, knex } from "../utilities/app-database";
import { SessionType } from '../types/SessionType';

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

// Linked with Route
const fetchExpenseTypes: () => Promise<ExpenseType[]> = async () => {
  return await ExpenseType
    .query()
    .select('*')
    .orderBy('name');
};

// Linked with Route
const fetchExpenseStatuses: () => Promise<ExpenseStatus[]> = async () => {
  return await ExpenseStatus
    .query()
    .select('*');
};

// Linked with Route
const countExpenses: (query: QueryType) => Promise<Expense[]> = async ({ criteria }) => {
  const query = Expense
    .query()
    .count('*');
  appendCriteria(query, criteria);
  return await query;
};

// Linked with Route
const searchExpenses: (query: QueryType) => Promise<Expense[]> = async ({ segment, criteria }) => {
  const query = Expense
    .query()
    .select(
      'id',
      'name',
      'details',
      'amount',
      'spent_at',
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
    .withGraphFetched('[team,requestor,approver,type,status,files]')
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

// Linked with Route
const createExpense: (user: SessionType, payload: ExpensePayloadType) => Promise<Expense> = async (user, payload) => {
  const [ pendingStatus ] = await ExpenseStatus
    .query()
    .select('id', 'name')
    .where('name', EXPENSE_STATUS_TYPE.PENDING);
  const { id } = await Expense
    .query()
    .insertGraph({
      ...payload,
      status_id: pendingStatus.id,
      requestor_id: user.id,
      requested_at: DayJS().toISOString(),
    } as any, { allowRefs: true });
  const expense = await searchExpenses({
    segment: {
      page: 1,
      item: 1,
    },
    criteria: [{
      field: 'id',
      operator: Operator.EQUAL,
      reference: id,
    }],
  });
  return expense[0];
};

// Linked with Route
const changeStatus: (user: SessionType, payload: StatusType) => Promise<Expense> = async (user, payload) => {
  const { id, status_id } = payload;
  await Expense.query()
    .updateAndFetchById(id, {
      status_id,
    });
  const expense = await searchExpenses({
    segment: {
      page: 1,
      item: 1,
    },
    criteria: [{
      field: 'id',
      operator: Operator.EQUAL,
      reference: id,
    }],
  });
  return expense[0];
};

export const ExpenseService = {
  fetchExpenseTypes,
  fetchExpenseStatuses,
  countExpenses,
  searchExpenses,
  createExpense,
  changeStatus,
};
