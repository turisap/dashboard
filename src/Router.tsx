import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const Home = lazy(() => import("routes/home"));
const News = lazy(() => import("routes/news"));
const RealTime = lazy(() => import("routes/realTime"));

import Menu from "components/menu";

// TODO Error boundaries for the whole app and each route
// TODO 404 page

const Router: React.FC = () => {
  return (
    <Suspense fallback={<h1>...loading</h1>}>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/dashboard" component={Home} exact />
          <Route path="/feed" component={News} exact />
          <Route path="/real_time" component={RealTime} exact />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
