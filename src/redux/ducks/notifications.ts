import { createReducer, createAction, getType } from "typesafe-actions";
import { takeEvery, fork, select } from "redux-saga/effects";

import { actionPrefixer } from "utils/";
import { Notification, REDUCERS } from "types/";

const DUCK_PREFIX = "notifications";

const prs = actionPrefixer(DUCK_PREFIX);

const enqueueNotification = createAction(prs("enqueueNotification"))<
  Pick<Notification, "text" | "type">
>();

const DEFAULT: REDUCERS.NotificationState = [];

const notificationsReducer = createReducer<REDUCERS.NotificationState>(DEFAULT);

function* dequeueNotifications() {
  const state = yield select((state: REDUCERS.RootState) => state);
}

function* watchNotificationQueue() {
  yield takeEvery(getType(enqueueNotification), dequeueNotifications);
}
const notificationSagas = [fork(watchNotificationQueue)];

export default notificationsReducer;
export { enqueueNotification, notificationSagas };
