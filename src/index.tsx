import React from "react";
import { render } from "react-dom";

import "./styles/index.scss";

// TODO upgrade to webpack 5

import App from "./App";

render(<App />, document.getElementById("app"));
