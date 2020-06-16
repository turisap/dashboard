import { createAsyncAction, getType, createReducer } from "typesafe-actions";
import { take, call, put, fork, delay } from "redux-saga/effects";
import produce from "immer";
import LogRocket from "logrocket";

import { REDUCERS, API } from "types/";
import { asyncActionPrefixer } from "utils/";
import { get } from "requestBuilder";

import { ioTSLogger } from "../../utils";
import { enqueueNotification } from "./notifications";

const DUCK_PREFIX = "goods";
const BASE_ENDPOINT = "/goods";
const FETCH_RETRY_TIMES = parseInt(process.env.FETCH_RETRY || "1");
const FETCH_DELAY = parseInt(process.env.FETCH_DELAY || "0");

const pra = asyncActionPrefixer(DUCK_PREFIX);

// data fetching
const fetchPurchases = createAsyncAction(...pra("fetchPurchases"))<
  void,
  API.PurchasesList,
  string
>();

const DEFAULT: REDUCERS.PurchasesState = {
  purchases: [],
  pageStatus: "prestine",
};

const purchasesReducer = createReducer<REDUCERS.PurchasesState>(DEFAULT)
  .handleAction(
    fetchPurchases.success,
    (_: REDUCERS.PurchasesState, { payload }) =>
      produce(_, (draftState) => {
        draftState.purchases = payload;
        draftState.pageStatus = "dirty";
      })
  )
  .handleAction(fetchPurchases.failure, (_: REDUCERS.PurchasesState) =>
    produce(_, (draftState) => {
      draftState.pageStatus = "fail";
    })
  );

function* getPurchases() {
  for (let i = 0; i < FETCH_RETRY_TIMES; i++) {
    try {
      const result: API.PurchasesList = yield call(get, BASE_ENDPOINT);

      ioTSLogger(API.PurchasesList, result, "fetch purchases");

      yield put(fetchPurchases.success(result));

      return true;
    } catch (error) {
      yield delay(FETCH_DELAY);
    }
  }

  yield put(fetchPurchases.failure("fetching purchases failed"));
  yield put(
    enqueueNotification({
      type: "failure",
      text: "Error fetching purchases",
    })
  );

  throw new Error("Retry attempts limit exceeded");
}

function* watchfetchPurchases() {
  while (true) {
    try {
      yield take(getType(fetchPurchases.request));
      yield call(getPurchases);
    } catch (err) {
      LogRocket.captureMessage(err);
    }
  }
}

const purchasesSagas = [fork(watchfetchPurchases)];

export default purchasesReducer;

export { purchasesSagas, fetchPurchases };
