import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "components/home/Home";
import News from "components/news/News";
import RealTime from "components/realTime/RealTime";

import Menu from "components/Menu";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/news" component={News} exact />
        <Route path="/real_time" component={RealTime} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
