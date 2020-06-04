import { createReducer, createAction, getType } from "typesafe-actions";
import { takeEvery, fork, select, put } from "redux-saga/effects";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import { actionPrefixer } from "utils/";
import { Notification, REDUCERS } from "types/";

import { notificationStore } from "../notificationStore";

type NotificationData = Pick<Notification, "text" | "type">;

const DUCK_PREFIX = "notifications";

const prs = actionPrefixer(DUCK_PREFIX);

const enqueueNotification = createAction(prs("enqueueNotification"))<
  NotificationData
>();

const sendNotification = (data: NotificationData) => () =>
  notificationStore.dispatch(enqueueNotification(data));

const DEFAULT: REDUCERS.NotificationState = {
  notifications: [],
};

const notificationsReducer = createReducer<REDUCERS.NotificationState>(
  DEFAULT
).handleAction(
  enqueueNotification,
  (state: REDUCERS.NotificationState, { payload }) =>
    produce(state, (draftState) => {
      draftState.notifications.push({
        id: uuidv4(),
        time: Date.now(),
        text: payload.text,
        type: payload.type,
      });
    })
);

function* dequeueNotifications() {
  const state = yield select((state: REDUCERS.RootState) => state);
  console.log(state);
  yield put({ type: "console", payload: state });
}

function* watchNotificationQueue() {
  yield takeEvery(getType(enqueueNotification), dequeueNotifications);
}

const notificationSagas = [fork(watchNotificationQueue)];

export default notificationsReducer;

export { notificationsReducer, sendNotification, notificationSagas };
