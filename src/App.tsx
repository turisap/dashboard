import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

import { get } from "request";

import { store } from "./redux/store";

import AppRouter from "./Router";

const App = () => {
  useEffect(() => {
    get("https://jsonplaceholder.typicode.com/posts");
  }, []);

  return (
    <div id="main">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
};

export default hot(App);
