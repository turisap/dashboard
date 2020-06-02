import {
  createAction,
  createAsyncAction,
  getType,
  createReducer,
} from "typesafe-actions";
import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import produce from "immer";

import { REDUCERS, API } from "types/";
import { actionPrefixer, asyncActionPrefixer } from "utils/";
import { get, post } from "requestBuilder";

import { ioTSLogger } from "../../utils";

const DUCK_PREFIX = "lists";

const prs = actionPrefixer(DUCK_PREFIX);
const pra = asyncActionPrefixer(DUCK_PREFIX);

type ButtonTypes = "star" | "mark" | "sync" | "flag";

type TableTypes = "expense" | "incoming";

type ToggleButtonPayload = {
  id: number;
  item: ButtonTypes;
  type: TableTypes;
};

// app state
const toggleExpenseModal = createAction(prs("toggleExpenseModal"))<number>();
const toggleIncomingModal = createAction(prs("toggleIncomingModal"))<number>();
const closeAllModals = createAction(prs("closeAllModals"))<void>();

// data fetching
const fetchAllExpenses = createAsyncAction(...pra("fetchExpenses"))<
  void,
  API.Expense[],
  string
>();
const fetchAllIncomings = createAsyncAction(...pra("fetchIncomings"))<
  void,
  API.Incoming,
  string
>();
const toggleModalButton = createAsyncAction(...pra("toggleModalButton"))<
  ToggleButtonPayload,
  void,
  void
>();

const DEFAULT: REDUCERS.ListsState = {
  expenseModalOpen: false,
  incomingModalOpen: false,
  incomingsStatus: "prestine",
  expensesStatus: "prestine",
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
        draftState.incomingsStatus = "success";
      })
  );
// .handleAction(toggleModalButton.failure, (state: REDUCERS.ListsState, { payload }) =>
//   produce(state, (draftState) => {
//     draftState.expenses = state.expenses.map((exp) => {
//       if ((exp.id = payload)) return { ...exp, starred: false };

//       return exp;
//     });
//   })
// );

// TODO add typings to sagas

// worker sagas
function* getExpenses() {
  try {
    const result = yield call(get, "/expenses");
    ioTSLogger(API.ExpensesList, result, "fetch expenses");

    yield put(fetchAllExpenses.success(result));
  } catch (error) {
    yield put(fetchAllExpenses.failure("fetching expenses failed"));
  }
}

function* getIncomings() {
  try {
    const result = yield call(get, "/incomings");
    ioTSLogger(API.IncomingsList, result, "fetch incomings");

    yield put(fetchAllIncomings.success(result));
  } catch (error) {
    yield put(fetchAllIncomings.failure("fetching incomings failed"));
  }
}

function* starExpense(payload: ToggleButtonPayload) {
  try {
    yield call(post, "/star", payload);

    yield put(toggleModalButton.success());
  } catch (err) {
    yield put(toggleModalButton.failure());
  }
}

// watcher sagas
function* watchFetchExpenses() {
  yield takeLatest(getType(fetchAllExpenses.request), getExpenses);
}

function* watchFetchIncomings() {
  yield takeLatest(getType(fetchAllIncomings.request), getIncomings);
}

function* watchtoggleModalButton() {
  while (true) {
    const { payload } = yield take(getType(toggleModalButton.request));
    yield call(starExpense, payload);
  }
}

const listsSagas = [
  fork(watchFetchExpenses),
  fork(watchFetchIncomings),
  fork(watchtoggleModalButton),
];

export default listsReducer;

export {
  toggleExpenseModal,
  toggleIncomingModal,
  closeAllModals,
  fetchAllExpenses,
  fetchAllIncomings,
  toggleModalButton,
  listsSagas,
  ToggleButtonPayload,
  ButtonTypes,
  TableTypes,
};
