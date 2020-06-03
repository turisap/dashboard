import { createAction, getType } from "typesafe-actions";
import { takeEvery, fork } from "redux-saga/effects";

import { actionPrefixer } from "utils/";
import { Notification } from "types/";

const DUCK_PREFIX = "notifications";

const prs = actionPrefixer(DUCK_PREFIX);

const enqueueNotification = createAction(prs("enqueueNotification"))<
  Pick<Notification, "text" | "type">
>();

// TODO use RxJS here OR OR OR saga

function* dequeueNotifications() {
  yield 1;
}

function* watchNotificationQueue() {
  yield takeEvery(getType(enqueueNotification), dequeueNotifications);
}
const notificationSagas = [fork(watchNotificationQueue)];

export { enqueueNotification, notificationSagas };
