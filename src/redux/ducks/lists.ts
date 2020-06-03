import {
  createAction,
  createAsyncAction,
  getType,
  createReducer,
} from "typesafe-actions";
import { takeLatest, call, put, fork, take, delay } from "redux-saga/effects";
import produce from "immer";

import { REDUCERS, API } from "types/";
import { actionPrefixer, asyncActionPrefixer } from "utils/";
import { get, post } from "requestBuilder";

import { ioTSLogger } from "../../utils";

const DUCK_PREFIX = "lists";

const prs = actionPrefixer(DUCK_PREFIX);
const pra = asyncActionPrefixer(DUCK_PREFIX);

type ButtonTypes = keyof API.ButtonFields;

type TableTypes = "expenses" | "incomings";

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
  ToggleButtonPayload
>();

const DEFAULT: REDUCERS.ListsState = {
  expenseModalOpen: false,
  incomingModalOpen: false,
  incomingsStatus: "prestine",
  expensesStatus: "prestine",
  selectedExpenseId: 0,
  selectedIncomeId: 0,
  modalUpdatingState: "idle",
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
  )
  // this is an optimistic update
  // consistency is ensured by the next failure handler
  .handleAction(
    toggleModalButton.request,
    (state: REDUCERS.ListsState, { payload }) => {
      const { id, item, type } = payload;
      const notPending = state.modalUpdatingState !== "loading";

      return produce(state, (draftState) => {
        if (notPending) {
          draftState[type].forEach((row) => {
            if (row.id === id) {
              row[item] = !row[item];
            }
          });
        }

        draftState.modalUpdatingState = "loading";
      });
    }
  )
  .handleAction(toggleModalButton.success, (state: REDUCERS.ListsState) =>
    produce(state, (draftState) => {
      draftState.modalUpdatingState = "idle";
    })
  )
  .handleAction(
    toggleModalButton.failure,
    (state: REDUCERS.ListsState, { payload }) => {
      const { id, item, type } = payload;

      return produce(state, (draftState) => {
        draftState[type].forEach((row) => {
          if (row.id === id) {
            row[item] = !row[item];
          }
        });
        draftState.modalUpdatingState = "idle";
      });
    }
  );

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

function* toggleButtonState(payload: ToggleButtonPayload) {
  for (let i = 0; i <= 10; i++) {
    try {
      const success = yield call(post, `/lists/${payload.item}`, payload);

      return success;
    } catch (err) {
      yield delay(500);
    }
  }

  throw new Error("Retry attempts exceeded");
}

function* retryButton(payload: ToggleButtonPayload) {
  try {
    yield call(toggleButtonState, payload);
    yield put(toggleModalButton.success());
  } catch (err) {
    yield put(toggleModalButton.failure(payload));
  }
}

// watcher sagas
function* watchFetchExpenses() {
  yield takeLatest(getType(fetchAllExpenses.request), getExpenses);
}

function* watchFetchIncomings() {
  yield takeLatest(getType(fetchAllIncomings.request), getIncomings);
}

function* watchToggleButton() {
  while (true) {
    const { payload } = yield take(getType(toggleModalButton.request));
    yield fork(retryButton, payload);
  }
}

const listsSagas = [
  fork(watchFetchExpenses),
  fork(watchFetchIncomings),
  fork(watchToggleButton),
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
