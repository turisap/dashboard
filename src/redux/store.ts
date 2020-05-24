import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import "regenerator-runtime/runtime";

import lists from "./ducks/lists";

function* exampleSaga() {
  console.log("Example saga reached");
  yield 1;
}

const rootReducer = combineReducers({
  lists
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(exampleSaga);
