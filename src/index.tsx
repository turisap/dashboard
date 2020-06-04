import React from "react";
import { render } from "react-dom";

import App from "./App";

import "./styles/index.scss";

// TODO upgrade to webpack 5

render(<App />, document.getElementById("app"));
