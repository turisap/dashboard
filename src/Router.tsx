import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Home = lazy(() => import("routes/home/index"));
const News = lazy(() => import("routes/news/index"));
const RealTime = lazy(() => import("routes/realTime/index"));

import Menu from "components/Menu";

const Router: React.FC = () => {
  return (
    <Suspense fallback={<h1>...loading</h1>}>
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
