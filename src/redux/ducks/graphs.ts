import { createAsyncAction, getType, createReducer } from "typesafe-actions";
import { take, call, put, fork, delay } from "redux-saga/effects";
import LogRocket from "logrocket";

import { API } from "types/";
import { asyncActionPrefixer } from "utils/";
import { get } from "requestBuilder";

import { ioTSLogger } from "../../utils";
import { enqueueNotification } from "./notifications";

const BASE_ENDPOINT = "/graph_data";
const DUCK_PREFIX = "graphs";
const FETCH_RETRY_TIMES = parseInt(process.env.FETCH_RETRY || "1");
const FETCH_DELAY = parseInt(process.env.FETCH_DELAY || "0");

const pra = asyncActionPrefixer(DUCK_PREFIX);

// data fetching
const fetchGraphData = createAsyncAction(...pra("fetchGraphData"))<
  void,
  API.GraphData,
  string
>();

const DEFAULT: API.GraphData = {
  expenses: [],
  leisure: [],
  thisMonth: [],
  monthlyBills: [],
  lastWeek: [],
  overbudget: [],
};

const graphsReducer = createReducer<API.GraphData>(DEFAULT).handleAction(
  fetchGraphData.success,
  (_: API.GraphData, { payload }) => payload
);

// TODO retry API calls
function* getGraphData() {
  for (let i = 0; i < FETCH_RETRY_TIMES; i++) {
    try {
      const result: API.GraphData = yield call(get, BASE_ENDPOINT);

      ioTSLogger(API.GraphData, result, "fetch graph data");

      yield put(fetchGraphData.success(result));

      return true;
    } catch (error) {
      LogRocket.captureException(error);
      yield delay(FETCH_DELAY);
    }
  }

  yield put(fetchGraphData.failure("fetching graph data failed"));
  yield put(
    enqueueNotification({
      type: "failure",
      text: "Error fetching overview",
    })
  );

  throw new Error("Retry attempts limit exceeded");
}

function* watchFetchGraphData() {
  while (true) {
    try {
      yield take(getType(fetchGraphData.request));
      yield call(getGraphData);
    } catch (err) {
      LogRocket.captureException(err);
    }
  }
}

const graphSagas = [fork(watchFetchGraphData)];

export default graphsReducer;

export { graphSagas, fetchGraphData };
