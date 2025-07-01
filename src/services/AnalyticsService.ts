// Libraries
import { raw } from "objection";

// Models
import { Expense } from "../models/Expense";

// Types
import { QueryType } from "../types/QueryType";
import { SessionType } from "../types/SessionType";

// Utilities
import { appendCriteria } from "../utilities/app-database";

const getAnalyticsByKey: (user: SessionType, query: QueryType) => Promise<any[]> = async (user, query) => {
  const { groupBy, criteria } = query;
  console.log(query);
  const result = await Expense
    .query()
    .select(
      raw(`TO_CHAR(requested_at, 'YYYY-MM-DD') as date`),
      `${groupBy}`,
      raw(`SUM(amount::numeric) as total_amount`)
    )
    // .modify((builder) => {
    //   if (criteria?.startDate) {
    //     builder.where('requested_at', '>=', criteria.startDate);
    //   }
    //   if (criteria?.endDate) {
    //     builder.where('requested_at', '<=', criteria.endDate);
    //   }
    // })
    .groupByRaw(`TO_CHAR(requested_at, 'YYYY-MM-DD'), ??`, [groupBy])
    .orderBy('date', 'ASC');
  return result;
};

export const AnalyticsService = {
  getAnalyticsByKey,
};
