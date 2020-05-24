import { createAction, createReducer } from "typesafe-actions";

import { REDUCERS } from "types/";
import { actionPrefixer } from "utils";
import { fakeIncomings, fakeExpenses } from "../../mocks";

const listsActions = actionPrefixer("lists");

// app state
export const toggleModal = createAction(listsActions("ToggleModal"))<void>();

const FAKE_ITEMS_COUNT = 10000;
const incomings = fakeIncomings(FAKE_ITEMS_COUNT);
const expenses = fakeExpenses(FAKE_ITEMS_COUNT);

const DEFAULT: REDUCERS.ListsState = {
  modalOpen: false,
  expenses,
  incomings,
};

const listsReducer = createReducer(DEFAULT).handleAction(
  toggleModal,
  (state) => ({
    ...state,
    modalOpen: !state.modalOpen,
  })
);

export default listsReducer;
