import React from "react";
import { render } from "react-dom";

import App from "./App";
import NotificationApp from "./notifications/NotificationsApp";

import "./styles/index.scss";

// TODO upgrade to webpack 5

render(<App />, document.getElementById("app"));
render(<NotificationApp />, document.getElementById("notification-root"));
