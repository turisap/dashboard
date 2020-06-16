import { createAsyncAction, getType, createReducer } from "typesafe-actions";
import { takeLatest, call, put, fork } from "redux-saga/effects";
import produce from "immer";
import LogRocket from "logrocket";

import { REDUCERS, API } from "types/";
import { asyncActionPrefixer } from "utils/";
import { get } from "requestBuilder";

import { ioTSLogger } from "../../utils";
import { enqueueNotification } from "./notifications";

// TODO add base endpoint for other ducks
const DUCK_PREFIX = "goods";
const BASE_ENDPOINT = "/goods";

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
  try {
    const result: API.PurchasesList = yield call(get, BASE_ENDPOINT);

    ioTSLogger(API.PurchasesList, result, "fetch purchases");

    yield put(fetchPurchases.success(result));
  } catch (error) {
    LogRocket.captureException(error);
    yield put(fetchPurchases.failure("fetching purchases failed"));
    yield put(
      enqueueNotification({ type: "failure", text: "Error fetching purchases" })
    );
  }
}

function* watchfetchPurchases() {
  yield takeLatest(getType(fetchPurchases.request), getPurchases);
}

const purchasesSagas = [fork(watchfetchPurchases)];

export default purchasesReducer;

export { purchasesSagas, fetchPurchases };
