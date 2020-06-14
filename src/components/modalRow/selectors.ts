import { createSelector } from "reselect";

import { API, REDUCERS } from "types/";

export const getExpenseModalOpen = (state: REDUCERS.RootState) =>
  state.lists.expenseModalOpen;

export const getIncomeModalOpen = (state: REDUCERS.RootState) =>
  state.lists.incomingModalOpen;

const getIncomeClickedId = (state: REDUCERS.RootState) =>
  state.lists.selectedIncomeId;

const getExpenseClickedId = (state: REDUCERS.RootState) =>
  state.lists.selectedExpenseId;

const getExpenses = (state: REDUCERS.RootState) => state.lists.expenses;
const getIncomings = (state: REDUCERS.RootState) => state.lists.incomings;

export const getClickedExpenseMemo = createSelector(
  [getExpenses, getExpenseClickedId],
  (expenses, clickedId) =>
    expenses.find((expense) => expense.id === clickedId) as API.Expense
);

export const getClickedIncomingMemo = createSelector(
  [getIncomings, getIncomeClickedId],
  (incomings, clickedId) =>
    incomings.find((incoming) => incoming.id === clickedId) as API.Incoming
);
