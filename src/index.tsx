import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import Notifications from "components/notifications";

import { store } from "./redux/store";
import AppRouter from "./Router";

import "./styles/index.scss";

const App = () => (
  <Provider store={store}>
    <Notifications />
    <div id="main">
      <AppRouter />
    </div>
  </Provider>
);

render(<App />, document.getElementById("app"));
