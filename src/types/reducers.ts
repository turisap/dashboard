import { Expense, Incoming, GraphData, Purchase } from "./api";
import {
  LoadingStatus,
  BasicLoadingStatus,
  Notification,
  DocumentStatus,
  Message,
} from "./index";

type RootState = {
  system: SystemState;
  lists: ListsState;
  notifications: NotificationState;
  graphs: GraphData;
  purchases: PurchasesState;
};

interface CommonState {
  pageStatus: LoadingStatus;
}

type SystemState = {
  documentStatus: DocumentStatus;
  messages: Array<Message>;
};

interface PurchasesState extends CommonState {
  purchases: Array<Purchase>;
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

export {
  RootState,
  ListsState,
  NotificationState,
  SystemState,
  PurchasesState,
};
