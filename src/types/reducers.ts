import { Expense, Incoming } from "./index";

type RootState = {
  lists: ListsState;
};

// EXPENSES AND INCOMINGS PAGE STATE
type ListsState = {
  modalOpen: boolean;
  incomings: Array<Incoming>;
  expenses: Array<Expense>;
};

export { RootState, ListsState };
