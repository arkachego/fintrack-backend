// Models
import { ExpenseType } from "../models/ExpenseType";
import { ExpenseStatus } from "../models/ExpenseStatus";

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

export const ExpenseService = {
  fetchExpenseTypes,
  fetchExpenseStatuses,
};
