import React, { useEffect } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

import Notifications from "components/notifications";
import { ErrorBoundary } from "components/boundary";

import { store } from "./redux/store";
import AppRouter from "./Router";
import { docVisibilityChanged } from "./redux/ducks/system";

//import "./logrocket";
import "./INIT";

ReactGA.initialize(process.env.GA_TRACKING_ID as string);
ReactGA.pageview(window.location.pathname + window.location.search);

setupLogRocketReact(LogRocket);

LogRocket.init(process.env.LOGROCKET_ID as string);

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

render(<App />, document.getElementById("app"));
