import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Home = lazy(() => import("routes/home"));
const News = lazy(() => import("routes/news"));
const RealTime = lazy(() => import("routes/realTime"));

import Menu from "components/Menu";

const Router: React.FC = () => {
  return (
    <Suspense fallback={<div>...loading</div>}>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/news" component={News} exact />
          <Route path="/real_time" component={RealTime} exact />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
