import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { composeWithDevTools } from "redux-devtools-extension";
import "regenerator-runtime/runtime";

import notificationsReducer, { notificationSagas } from "./notifications";

console.log("reducer", notificationsReducer);
console.log("sagas", notificationSagas);

export default function* rootSaga() {
  yield all([...notificationSagas]);
}

const rootReducer = combineReducers({
  notifications: notificationsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  name: "Notifications",
});

// TODO check it might be a problem for prod

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export { store as notificationStore };
