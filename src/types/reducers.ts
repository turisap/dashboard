import { Expense, Incoming } from "./api";
import { LoadingStatus } from "./index";

type RootState = {
  lists: ListsState;
};

interface CommonState {
  test?: boolean;
}

// EXPENSES AND INCOMINGS PAGE STATE
interface ListsState extends CommonState {
  incomings: Array<Incoming>;
  expenses: Array<Expense>;
  expenseModalOpen: boolean;
  incomingModalOpen: boolean;
  selectedIncomeId: number;
  selectedExpenseId: number;
  incomingsStatus: LoadingStatus;
  expensesStatus: LoadingStatus;
}

export { RootState, ListsState };
