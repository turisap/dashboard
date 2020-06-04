import { Expense, Incoming } from "./api";
import { LoadingStatus, BasicLoadingStatus, Notification } from "./index";

type RootState = {
  lists: ListsState;
};

type NotificationRootState = {
  notifications: NotificationState;
};

// TODO remove or refactor this into real common state
interface CommonState {
  test?: boolean;
}

type NotificationState = Array<Notification>;

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

export { RootState, NotificationRootState, ListsState, NotificationState };
