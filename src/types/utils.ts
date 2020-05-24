import { RowInfo, Expense } from "./index";

// custom type guards
function isExpense(row: RowInfo): row is Expense {
  return (row as Expense).type !== undefined;
}

export { isExpense };
