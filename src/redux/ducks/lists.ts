import {
  createAction,
  createAsyncAction,
  getType,
  createReducer,
} from "typesafe-actions";
import { takeLatest, call, put, fork } from "redux-saga/effects";
import produce from "immer";

import { REDUCERS, API } from "types/";
import { actionPrefixer } from "utils/";
import { get } from "requestBuilder";
import { fakeIncomings, fakeExpenses } from "../../mocks";

const la = actionPrefixer("lists");

// app state
const toggleExpenseModal = createAction(la("toggleExpenseModal"))<number>();
const toggleIncomingModal = createAction(la("toggleIncomingModal"))<number>();
const closeAllModals = createAction(la("closeAllModals"))<void>();

// fetch data
const fetchAllExpenses = createAsyncAction(
  la("fetchExpensesRequest"),
  la("fetchExpensesSuccess"),
  la("fetchExpensesFail")
)<void, API.Expense[], Error>();

const FAKE_ITEMS_COUNT = 10000;
const incomings = fakeIncomings(FAKE_ITEMS_COUNT);

const DEFAULT: REDUCERS.ListsState = {
  expenseModalOpen: false,
  incomingModalOpen: false,
  selectedExpenseId: 0,
  selectedIncomeId: 0,
  expenses: [],
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
  )
  .handleAction(
    fetchAllExpenses.success,
    (state: REDUCERS.ListsState, { payload }) =>
      produce(state, (draftState) => {
        draftState.expenses = payload;
      })
  );

// worker sagas
function* getExpenses() {
  try {
    const result = yield call(get, "/expenses");
    yield put(fetchAllExpenses.success(result));
  } catch (e) {
    console.log(e);
    // yield put(
    //   actions.usersError({
    //     error: "An error occurred when trying to get the users",
    //   })
    // );
  }
}

// watcher sagas
function* watchFetchExpenses() {
  yield takeLatest(getType(fetchAllExpenses.request), getExpenses);
}

const listsSagas = [fork(watchFetchExpenses)];

export default listsReducer;

export {
  toggleExpenseModal,
  toggleIncomingModal,
  closeAllModals,
  fetchAllExpenses,
  listsSagas,
};
