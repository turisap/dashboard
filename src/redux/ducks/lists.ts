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

const la = actionPrefixer("lists");

// app state
const toggleExpenseModal = createAction(la("toggleExpenseModal"))<number>();
const toggleIncomingModal = createAction(la("toggleIncomingModal"))<number>();
const closeAllModals = createAction(la("closeAllModals"))<void>();

// data fetching
const fetchAllExpenses = createAsyncAction(
  la("fetchExpensesRequest"),
  la("fetchExpensesSuccess"),
  la("fetchExpensesFail")
)<void, API.Expense[], string>();

const fetchAllIncomings = createAsyncAction(
  la("fetchIncomingsRequest"),
  la("fetchIncomingsSuccess"),
  la("fetchIncomingsFail")
)<void, API.Incoming, string>();

const DEFAULT: REDUCERS.ListsState = {
  expenseModalOpen: false,
  incomingModalOpen: false,
  selectedExpenseId: 0,
  selectedIncomeId: 0,
  expenses: [],
  incomings: [],
};

const listsReducer = createReducer<REDUCERS.ListsState>(DEFAULT)
  .handleAction(toggleExpenseModal, (state: REDUCERS.ListsState, { payload }) =>
    produce(state, (draftState) => {
      draftState.expenseModalOpen = !state.expenseModalOpen;
      draftState.selectedExpenseId = payload;
    })
  )
  .handleAction(
    toggleIncomingModal,
    (state: REDUCERS.ListsState, { payload }) =>
      produce(state, (draftState) => {
        draftState.incomingModalOpen = !state.incomingModalOpen;
        draftState.selectedIncomeId = payload;
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
  )
  .handleAction(
    fetchAllIncomings.success,
    (state: REDUCERS.ListsState, { payload }) =>
      produce(state, (draftState) => {
        draftState.incomings = payload;
      })
  );

// TODO add typings to sagas
// TODO add skeletons to row in the table

// worker sagas
function* getExpenses() {
  try {
    const result = yield call(get, "/expenses");
    yield put(fetchAllExpenses.success(result));
  } catch (error) {
    yield put(fetchAllExpenses.failure("fetching expenses failed"));
  }
}

function* getIncomings() {
  try {
    const result = yield call(get, "/incomings");
    yield put(fetchAllIncomings.success(result));
  } catch (error) {
    yield put(fetchAllIncomings.failure("fetching incomings failed"));
  }
}

// watcher sagas
function* watchFetchExpenses() {
  yield takeLatest(getType(fetchAllExpenses.request), getExpenses);
}

function* watchFetchIncomings() {
  yield takeLatest(getType(fetchAllIncomings.request), getIncomings);
}

const listsSagas = [fork(watchFetchExpenses), fork(watchFetchIncomings)];

export default listsReducer;

export {
  toggleExpenseModal,
  toggleIncomingModal,
  closeAllModals,
  fetchAllExpenses,
  fetchAllIncomings,
  listsSagas,
};
