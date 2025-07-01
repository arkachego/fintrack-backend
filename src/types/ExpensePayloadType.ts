import { FileType } from "./FileType";

export type ExpensePayloadType = {
  name: string;
  details: string | null;
  amount: string;
  spent_on: string;
  type_id: string;
  team_id: string;
  approver_id: string;
  files: FileType[];
};