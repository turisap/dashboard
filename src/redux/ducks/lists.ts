import { createAction, createReducer } from "typesafe-actions";

import { REDUCERS } from "types/";
import { actionPrefixer } from "utils";
import { fakeIncomings, fakeExpenses } from "../../mocks";

const la = actionPrefixer("lists");

// app state
export const toggleExpenseModal = createAction(la("toggleExpenseModal"))<
  number
>();
export const toggleIncomingModal = createAction(la("toggleIncomingModal"))<
  number
>();

const FAKE_ITEMS_COUNT = 10000;
const incomings = fakeIncomings(FAKE_ITEMS_COUNT);
const expenses = fakeExpenses(FAKE_ITEMS_COUNT);

const DEFAULT: REDUCERS.ListsState = {
  expenseModalOpen: false,
  incomingModalOpen: false,
  expenses,
  incomings,
  selectedId: 0,
};

const listsReducer = createReducer<REDUCERS.ListsState>(DEFAULT)
  .handleAction(toggleExpenseModal, (state: REDUCERS.ListsState, action) => ({
    ...state,
    expenseModalOpen: !state.expenseModalOpen,
    selectedId: action.payload,
  }))
  .handleAction(toggleIncomingModal, (state: REDUCERS.ListsState, action) => ({
    ...state,
    incomingModalOpen: !state.incomingModalOpen,
    selectedId: action.payload,
  }));

export default listsReducer;
