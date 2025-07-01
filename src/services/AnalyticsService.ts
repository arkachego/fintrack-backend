// Type
import { QueryType } from "../types/QueryType";
import { SessionType } from "../types/SessionType";

const getAnalyticsByKey: (user: SessionType, query: QueryType) => Promise<any[]> = async (user, query) => {
  return [];
};

export const AnalyticsService = {
  getAnalyticsByKey,
};
