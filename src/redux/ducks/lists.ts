import {
  createAction,
  createAsyncAction,
  getType,
  createReducer,
} from "typesafe-actions";
import { call, put, fork, take, delay } from "redux-saga/effects";
import produce from "immer";
import LogRocket from "logrocket";

import { REDUCERS, API } from "types/";
import { actionPrefixer, asyncActionPrefixer } from "utils/";
import { get, post } from "requestBuilder";

import { ioTSLogger } from "../../utils";
import { enqueueNotification } from "./notifications";

const DUCK_PREFIX = "lists";
const FETCH_RETRY_TIMES = parseInt(process.env.FETCH_RETRY || "1");
const FETCH_DELAY = parseInt(process.env.FETCH_DELAY || "0");

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
  API.IncomingsList,
  string
>();
const toggleModalButton = createAsyncAction(...pra("toggleModalButton"))<
  ToggleButtonPayload,
  ToggleButtonPayload,
  ToggleButtonPayload
>();

const DEFAULT: REDUCERS.ListsState = {
  expenseModalOpen: false,
  incomingModalOpen: false,
  incomingsStatus: "pristine",
  expensesStatus: "pristine",
  pageStatus: "pristine",
  selectedExpenseId: 0,
  selectedIncomeId: 0,
  modalUpdatingState: {
    starred: "idle",
    marked: "idle",
    synced: "idle",
    flagged: "idle",
  },
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
      const notPending = state.modalUpdatingState[item] !== "loading";

      return produce(state, (draftState) => {
        if (notPending) {
          draftState[type].forEach((row) => {
            if (row.id === id) {
              row[item] = !row[item];
            }
          });
        }

        draftState.modalUpdatingState[item] = "loading";
      });
    }
  )
  .handleAction(
    toggleModalButton.success,
    (state: REDUCERS.ListsState, { payload }) => {
      const { item } = payload;

      return produce(state, (draftState) => {
        draftState.modalUpdatingState[item] = "idle";
      });
    }
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
        draftState.modalUpdatingState[item] = "idle";
      });
    }
  );

// worker sagas
function* getExpenses() {
  for (let i = 0; i < FETCH_RETRY_TIMES; i++) {
    try {
      const result: API.ExpensesList = yield call(get, "/expenses");
      ioTSLogger(API.ExpensesList, result, "fetch expenses");

      yield put(fetchAllExpenses.success(result));

      return true;
    } catch (error) {
      yield delay(FETCH_DELAY);
      LogRocket.captureException(error);
    }
  }

  yield put(fetchAllExpenses.failure("fetching expenses failed"));
  yield put(
    enqueueNotification({
      text: "Error fetching expenses",
      type: "failure",
    })
  );

  throw new Error("Retry attempts limit exceeded");
}

function* getIncomings() {
  for (let i = 0; i < FETCH_RETRY_TIMES; i++) {
    try {
      const result: API.IncomingsList = yield call(get, "/incomings");
      ioTSLogger(API.IncomingsList, result, "fetch incomings");

      yield put(fetchAllIncomings.success(result));

      return true;
    } catch (error) {
      yield delay(FETCH_DELAY);
      LogRocket.captureException(error);
    }
  }

  yield put(fetchAllIncomings.failure("fetching incomings failed"));
  yield put(
    enqueueNotification({
      text: "Error fetching incomings",
      type: "failure",
    })
  );

  throw new Error("Retry attempts limit exceeded");
}

function* toggleButtonUpdate(payload: ToggleButtonPayload) {
  for (let i = 0; i <= FETCH_RETRY_TIMES; i++) {
    try {
      const success: boolean = yield call(
        post,
        `/lists/${payload.item}`,
        payload
      );

      return success;
    } catch (err) {
      yield delay(FETCH_DELAY);
    }
  }

  throw new Error("Retry attempts limit exceeded");
}

function* retryButton(payload: ToggleButtonPayload) {
  try {
    yield call(toggleButtonUpdate, payload);
    yield put(toggleModalButton.success(payload));
  } catch (err) {
    yield put(toggleModalButton.failure(payload));
    yield put(
      enqueueNotification({
        text: `Entry hasn't been updated`,
        type: "failure",
      })
    );
  }
}

// watcher sagas
function* watchFetchExpenses() {
  while (true) {
    try {
      yield take(getType(fetchAllExpenses.request));
      yield call(getExpenses);
    } catch (err) {
      LogRocket.captureException(err);
    }
  }
}

function* watchFetchIncomings() {
  while (true) {
    try {
      yield take(getType(fetchAllIncomings.request));
      yield call(getIncomings);
    } catch (err) {
      LogRocket.captureException(err);
    }
  }
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
