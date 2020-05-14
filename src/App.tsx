import { hot } from "react-hot-loader/root";
import React from "react";

import AppRouter from "./Router";

const App = () => {
  return (
    <div id="main">
      <AppRouter />
    </div>
  );
};

export default hot(App);
