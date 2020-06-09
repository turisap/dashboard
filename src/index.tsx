import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Notifications from "components/notifications";
import { ErrorBoundary } from "components/boundary";

import { store } from "./redux/store";
import AppRouter from "./Router";

import "./logrocket";
import "./INIT";

import "./styles/index.scss";

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <Notifications />
      <div id="main">
        <AppRouter />
      </div>
    </Provider>
  </ErrorBoundary>
);

render(<App />, document.getElementById("app"));
