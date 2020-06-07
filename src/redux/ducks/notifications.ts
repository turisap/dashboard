import "regenerator-runtime/runtime";
import { createReducer, createAction, getType } from "typesafe-actions";
import { eventChannel, END } from "redux-saga";
import socketIOClient from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import {
  fork,
  select,
  put,
  take,
  call,
  takeLatest,
  cancelled,
} from "redux-saga/effects";

import { actionPrefixer } from "utils/";
import { Notification, REDUCERS } from "types/";

type NotificationData = Pick<Notification, "text" | "type">;

const DUCK_PREFIX = "notifications";
const PERSIST_FOR = 5000;

const prs = actionPrefixer(DUCK_PREFIX);

const enqueueNotification = createAction(prs("enqueueNotification"))<
  NotificationData
>();
const setRemaining = createAction(prs("setRemaining"))<Array<Notification>>();
const dismissNotification = createAction(prs("dismissNotification"))<number>();

const createWS = (): WebSocket => socketIOClient(process.env.WS_ENDPOINT);

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
    [...state].map((n) => {
      if (n.id === payload) {
        return { ...n, in: false };
      }

      return n;
    })
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

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const notificationHanlder = (event) => {
      emit(event);
    };

    const errorHandler = (errorEvent) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on("notification", notificationHanlder);
    socket.on("error", errorHandler);

    const unsubscribe = () => {
      socket.off("notification", notificationHanlder);
    };

    return unsubscribe;
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

function* watchNotificationsWS() {
  const socket = yield call(createWS);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      const payload = yield take(socketChannel);
      yield put(enqueueNotification(payload));
    } catch (err) {
      console.error("socket error:", err);
      socketChannel.close();
    }
  }
}

const notificationSagas = [
  fork(watchNotificationQueue),
  fork(watchNotificationsWS),
];

export default notificationsReducer;
export { notificationSagas, enqueueNotification, dismissNotification };
