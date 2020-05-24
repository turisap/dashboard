import { RowInfoInner, ExpenseProps } from "./index";

// custom type guards
function isExpense(row: RowInfoInner): row is ExpenseProps {
  return (row as ExpenseProps).type !== undefined;
}

export { isExpense };
