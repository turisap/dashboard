import { createAction, createReducer } from "typesafe-actions";

import { REDUCERS } from "types/";
import { actionPrefixer } from "utils";
import { fakeIncomings, fakeExpenses } from "../../mocks";

const listsActions = actionPrefixer("lists");

// app state
export const toggleModal = createAction(listsActions("ToggleModal"))<number>();

const FAKE_ITEMS_COUNT = 10000;
const incomings = fakeIncomings(FAKE_ITEMS_COUNT);
const expenses = fakeExpenses(FAKE_ITEMS_COUNT);

const DEFAULT: REDUCERS.ListsState = {
  modalOpen: false,
  expenses,
  incomings,
  selectedId: 0,
};

const listsReducer = createReducer<REDUCERS.ListsState>(DEFAULT).handleAction(
  toggleModal,
  (state: REDUCERS.ListsState, action) => ({
    ...state,
    modalOpen: !state.modalOpen,
    selectedId: action.payload,
  })
);

export default listsReducer;
