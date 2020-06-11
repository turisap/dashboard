import { createAsyncAction, getType, createReducer } from "typesafe-actions";
import { takeLatest, call, put, fork } from "redux-saga/effects";
import LogRocket from "logrocket";

import { API } from "types/";
import { actionPrefixer, asyncActionPrefixer } from "utils/";
import { get } from "requestBuilder";

import { ioTSLogger } from "../../utils";
import { enqueueNotification } from "./notifications";

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

function* getGraphData() {
  try {
    const result = yield call(get, "/graph_data");

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
