import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { composeWithDevTools } from "redux-devtools-extension";
import "regenerator-runtime/runtime";

import lists, { listsSagas } from "./ducks/lists";

let store: Store;

export default function* rootSaga() {
  yield all([...listsSagas]);
}

const rootReducer = combineReducers({
  lists,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  name: "Expenses Dashboard",
});

// FIXME check it might be a problem for prod

if (process.env.NODE_ENV === "development") {
  store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
} else {
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(rootSaga);

export { store };
