import { createAsyncAction, getType, createReducer } from "typesafe-actions";
import { takeLatest, call, put, fork } from "redux-saga/effects";
import LogRocket from "logrocket";

import { API } from "types/";
import { asyncActionPrefixer } from "utils/";
import { get } from "requestBuilder";

import { ioTSLogger } from "../../utils";
import { enqueueNotification } from "./notifications";

const BASE_ENDPOINT = "/graph_data";
const DUCK_PREFIX = "graphs";

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
  try {
    const result: API.GraphData = yield call(get, BASE_ENDPOINT);

    ioTSLogger(API.GraphData, result, "fetch graph data");

    yield put(fetchGraphData.success(result));
  } catch (error) {
    LogRocket.captureException(error);
    yield put(fetchGraphData.failure("fetching graph data failed"));
    yield put(
      enqueueNotification({ type: "failure", text: "Error fetching overview" })
    );
  }
}

function* watchFetchGraphData() {
  yield takeLatest(getType(fetchGraphData.request), getGraphData);
}

const graphSagas = [fork(watchFetchGraphData)];

export default graphsReducer;

export { graphSagas, fetchGraphData };
