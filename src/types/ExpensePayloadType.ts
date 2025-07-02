export type ExpensePayloadType = {
  name: string;
  details: string | null;
  amount: string;
  attachment: string | null;
  spent_on: string;
  type_id: string;
  team_id: string;
  approver_id: string;
};