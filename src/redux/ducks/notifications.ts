import "regenerator-runtime/runtime";
import { createReducer, createAction, getType } from "typesafe-actions";
import { eventChannel, END } from "redux-saga";
import { fork, select, put, take, call, takeLatest } from "redux-saga/effects";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import { actionPrefixer } from "utils/";
import { Notification, REDUCERS } from "types/";

type NotificationData = Pick<Notification, "text" | "type">;

const DUCK_PREFIX = "notifications";
const PERSIST_FOR = 7000;

const prs = actionPrefixer(DUCK_PREFIX);

const enqueueNotification = createAction(prs("enqueueNotification"))<
  NotificationData
>();
const setRemaining = createAction(prs("setRemaining"))<Array<Notification>>();

const DEFAULT: REDUCERS.NotificationState = [];

const notificationsReducer = createReducer<REDUCERS.NotificationState>(DEFAULT)
  .handleAction(
    enqueueNotification,
    (state: REDUCERS.NotificationState, { payload }) =>
      produce(state, (draftState) => {
        draftState.push({
          id: uuidv4(),
          time: Date.now(),
          text: payload.text,
          type: payload.type,
        });
      })
  )
  .handleAction(setRemaining, (_, { payload }) => payload);

function timer(list) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      const filtered = list.filter(
        (notification) => Date.now() - notification.time < PERSIST_FOR
      );
      console.log(filtered);

      emitter(filtered);

      if (!filtered.length) emitter(END);
    }, 1000);

    return () => {
      clearInterval(iv);
    };
  });
}

function* dequeueNotifications() {
  const list = yield select((state: REDUCERS.RootState) => state.notifications);

  const chan = yield call(timer, list);
  try {
    while (true) {
      const remainingMsg = yield take(chan);
      yield put(setRemaining(remainingMsg));
    }
  } finally {
    console.log("countdown terminated");
  }
}

function* watchNotificationQueue() {
  yield takeLatest(getType(enqueueNotification), dequeueNotifications);
}

const notificationSagas = [fork(watchNotificationQueue)];

export default notificationsReducer;
export { notificationSagas, enqueueNotification };
