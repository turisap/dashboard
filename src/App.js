import { hot } from "react-hot-loader/root";
import React from "react";

import AppRouter from "./Router";

const App = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};

export default hot(App);
