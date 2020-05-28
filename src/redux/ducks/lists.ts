import { createAction, createReducer } from "typesafe-actions";
import produce from "immer";

import { REDUCERS } from "types/";
import { actionPrefixer } from "utils/";
import { fakeIncomings, fakeExpenses } from "../../mocks";

const la = actionPrefixer("lists");

// app state
const toggleExpenseModal = createAction(la("toggleExpenseModal"))<number>();
const toggleIncomingModal = createAction(la("toggleIncomingModal"))<number>();
const closeAllModals = createAction(la("closeAllModals"))<void>();

const FAKE_ITEMS_COUNT = 10000;
const incomings = fakeIncomings(FAKE_ITEMS_COUNT);
const expenses = fakeExpenses(FAKE_ITEMS_COUNT);

const DEFAULT: REDUCERS.ListsState = {
  expenseModalOpen: false,
  incomingModalOpen: false,
  selectedExpenseId: 0,
  selectedIncomeId: 0,
  expenses,
  incomings,
};

const listsReducer = createReducer<REDUCERS.ListsState>(DEFAULT)
  .handleAction(toggleExpenseModal, (state: REDUCERS.ListsState, action) =>
    produce(state, (draftState) => {
      draftState.expenseModalOpen = !state.expenseModalOpen;
      draftState.selectedExpenseId = action.payload;
    })
  )
  .handleAction(toggleIncomingModal, (state: REDUCERS.ListsState, action) =>
    produce(state, (draftState) => {
      draftState.incomingModalOpen = !state.incomingModalOpen;
      draftState.selectedIncomeId = action.payload;
    })
  )
  .handleAction(closeAllModals, (state: REDUCERS.ListsState) =>
    produce(state, (draftState) => {
      draftState.incomingModalOpen = false;
      draftState.expenseModalOpen = false;
      draftState.selectedExpenseId = 0;
      draftState.selectedIncomeId = 0;
    })
  );

export default listsReducer;
export { toggleExpenseModal, toggleIncomingModal, closeAllModals };
