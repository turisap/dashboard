import { hot } from "react-hot-loader/root";
import React from "react";
import { Provider } from "react-redux";

import { store } from "./redux/store";

import AppRouter from "./Router";

const App = () => {
  return (
    <div id="main">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
};

export default hot(App);
