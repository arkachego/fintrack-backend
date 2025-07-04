// Libraries
import DayJS from 'dayjs';

// Constants
import { EXPENSE_STATUS_TYPE } from '../constants/expense-status-types';

// Models
import { Expense } from "../models/Expense";
import { ExpenseStatus } from "../models/ExpenseStatus";

// Enums
import { Operator } from '../enums/OperatorEnum';

// Types
import { StatusType } from '../types/StatusType';
import { SessionType } from '../types/SessionType';
import { ExpensePayloadType } from '../types/ExpensePayloadType';
import { CriteriaType, QueryType, SegmentType } from "../types/QueryType";

// Utilities
import { appendCriteria } from "../utilities/app-database";

// Linked with Route
const countExpenses: (user: SessionType, query: QueryType) => Promise<Expense[]> = async (user, { criteria }) => {
  const query = Expense
    .query()
    .count('*');
  appendCriteria(user, query, criteria);
  return await query;
};

// Linked with Route
const searchExpenses: (user: SessionType, query: QueryType) => Promise<Expense[]> = async (user, { segment, criteria }) => {
  const query = Expense
    .query()
    .select(
      'id',
      'name',
      'details',
      'amount',
      'attachment',
      'spent_at',
      'requested_at',
      'approved_at',
      'rejected_at',
    );
  appendCriteria(user, query, criteria);
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
  const expense = await searchExpenses(user, {
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
  const status = await ExpenseStatus.query()
    .findById(status_id);
  const delta: Partial<Expense> = {
    status_id,
  };
  if (status?.name === EXPENSE_STATUS_TYPE.APPROVED) {
    delta.approved_at = DayJS().toISOString();
  }
  else {
    delta.rejected_at = DayJS().toISOString();
  }
  await Expense.query()
    .updateAndFetchById(id, delta);
  const expense = await searchExpenses(user, {
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
const getAnalyticsData: (user: SessionType, query: QueryType) => Promise<any[]> = async (user, query) => {
  const { criteria, granularity } = query;
  const granularityMap = {
    daily: `TO_CHAR(approved_at, 'YYYY-MM-DD')`,
    monthly: `TO_CHAR(approved_at, 'YYYY-MM')`,
    yearly: `TO_CHAR(approved_at, 'YYYY')`,
  };
  const groupExpr = granularityMap[granularity];
  const groupAlias = `${granularity}_id`;
  const [ approvedStatus ] = await ExpenseStatus
    .query()
    .select('id', 'name')
    .where('name', EXPENSE_STATUS_TYPE.APPROVED);
  const subquery = Expense
    .query()
    .select(
      Expense.raw(`${groupExpr} AS ${groupAlias}`),
      'amount'
    );
  const modifiedCriteria: CriteriaType[] = [
    ...criteria,
    {
      field: 'status_id',
      operator: Operator.EQUAL,
      reference: approvedStatus.id,
    },
  ];
  appendCriteria(user, subquery, modifiedCriteria);
  const result = await Expense
    .query()
    .from(subquery)
    .select(
      groupAlias,
      Expense.raw('SUM(amount)::float AS total_amount')
    )
    .groupBy(groupAlias)
    .orderBy(groupAlias, 'ASC');
  return result;
};

export const ExpenseService = {
  countExpenses,
  searchExpenses,
  createExpense,
  changeStatus,
  getAnalyticsData,
};
