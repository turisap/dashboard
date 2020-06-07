import "regenerator-runtime/runtime";
import { createReducer, createAction, getType } from "typesafe-actions";
import { eventChannel, END } from "redux-saga";
import {
  fork,
  select,
  put,
  take,
  call,
  takeLatest,
  cancelled,
} from "redux-saga/effects";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import { actionPrefixer } from "utils/";
import { Notification, REDUCERS } from "types/";

type NotificationData = Pick<Notification, "text" | "type">;

const DUCK_PREFIX = "notifications";
const PERSIST_FOR = 2000;

const prs = actionPrefixer(DUCK_PREFIX);

const enqueueNotification = createAction(prs("enqueueNotification"))<
  NotificationData
>();
const setRemaining = createAction(prs("setRemaining"))<Array<Notification>>();
const dismissNotification = createAction(prs("dismissNotification"))<number>();

const DEFAULT: REDUCERS.NotificationState = [];

const notificationsReducer = createReducer<REDUCERS.NotificationState>(DEFAULT)
  .handleAction(
    enqueueNotification,
    (state: REDUCERS.NotificationState, { payload }) =>
      produce(state, (draftState) => {
        draftState.push({
          id: uuidv4(),
          in: true,
          time: Date.now(),
          text: payload.text,
          type: payload.type,
        });
      })
  )
  .handleAction(setRemaining, (_, { payload }) => payload)
  .handleAction(dismissNotification, (state, { payload }) =>
    [...state].filter((n) => n.id !== payload)
  );

function timer(list: Array<Notification>) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      const persisted = list.map((notification) => ({
        ...notification,
        in: Date.now() - notification.time < PERSIST_FOR,
      }));

      const proceed = persisted.find((notification) => notification.in);

      emitter(persisted);

      if (!proceed) emitter(END);
    }, 3000);

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
    if (yield cancelled()) {
      chan.close();
    }
  }
}

function* watchNotificationQueue() {
  yield takeLatest(
    [getType(enqueueNotification), getType(dismissNotification)],
    dequeueNotifications
  );
}

const notificationSagas = [fork(watchNotificationQueue)];

export default notificationsReducer;
export { notificationSagas, enqueueNotification, dismissNotification };
