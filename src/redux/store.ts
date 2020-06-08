import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { composeWithDevTools } from "redux-devtools-extension";
import LogRocket from "logrocket";
import "regenerator-runtime/runtime";

import lists, { listsSagas } from "./ducks/lists";
import notifications, { notificationSagas } from "./ducks/notifications";

let store: Store;

export default function* rootSaga() {
  yield all([...listsSagas, ...notificationSagas]);
}

const rootReducer = combineReducers({
  lists,
  notifications,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composeEnhancers = composeWithDevTools({
  name: "Expenses Dashboard",
});

// FIXME check it might be a problem for the prod build

const logrocketOptions = {
  actionSanitizer: function(action) {
    if (action.type.endsWith("_NOLOG")) {
      return null;
    }

    return action;
  },
};

if (process.env.NODE_ENV === "development") {
  store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        ...middlewares,
        LogRocket.reduxMiddleware(logrocketOptions)
      )
    )
  );
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(...middlewares, LogRocket.reduxMiddleware(logrocketOptions))
  );
}

sagaMiddleware.run(rootSaga);

export { store };
