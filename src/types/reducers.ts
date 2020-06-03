import { Expense, Incoming } from "./api";
import { LoadingStatus, BasicLoadingStatus } from "./index";

type RootState = {
  lists: ListsState;
};

// TODO remove or refactor this into real common state
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
  modalUpdatingState: {
    starred: BasicLoadingStatus;
    marked: BasicLoadingStatus;
    synced: BasicLoadingStatus;
    flagged: BasicLoadingStatus;
  };
  incomingsStatus: LoadingStatus;
  expensesStatus: LoadingStatus;
}

export { RootState, ListsState };
