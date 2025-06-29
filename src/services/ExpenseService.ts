// Models
import { Expense } from "../models/Expense";
import { ExpenseType } from "../models/ExpenseType";
import { ExpenseStatus } from "../models/ExpenseStatus";

// Types
import { QueryType } from "../types/QueryType";

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

const countExpenses: (query: QueryType) => Promise<Expense[]> = async (query) => {
  console.log(query);
  return await Expense
    .query()
    .select('*');
};

const searchExpenses: (query: QueryType) => Promise<Expense[]> = async (query) => {
  console.log(query);
  return await Expense
    .query()
    .select('*');
};

export const ExpenseService = {
  fetchExpenseTypes,
  fetchExpenseStatuses,
  countExpenses,
  searchExpenses,
};
