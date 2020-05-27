import { Expense, Incoming } from "./api";

type RootState = {
  lists: ListsState;
};

interface CommonState {
  expenseModalOpen: boolean;
  incomingModalOpen: boolean;
  selectedIncomeId: number;
  selectedExpenseId: number;
}

// EXPENSES AND INCOMINGS PAGE STATE
interface ListsState extends CommonState {
  incomings: Array<Incoming>;
  expenses: Array<Expense>;
}

export { RootState, ListsState };