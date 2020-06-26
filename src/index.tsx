import React, { useEffect } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Notifications from "components/notifications";
import { ErrorBoundary } from "components/boundary";

import { store } from "./redux/store";
import AppRouter from "./Router";
import { docVisibilityChanged } from "./redux/ducks/system";
import ReselectApp from './reselect'

import "./logrocket";
import "./INIT";

const App = () => {
  const handleVisibilityChange = () =>
    store.dispatch(docVisibilityChanged(document.visibilityState));

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false
    );

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Notifications />
        <div id="main">
          <AppRouter />
        </div>
      </Provider>
    </ErrorBoundary>
  );
};

render(<ReselectApp />, document.getElementById("app"));
