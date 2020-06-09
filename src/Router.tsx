import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Home from "routes/home";
import News from "routes/news";
import RealTime from "routes/realTime";

import Menu from "components/menu";
import Nav from "components/nav";
import { ErrorBoundary } from "components/boundary";

// TODO Error boundaries for the whole app and each route
// TODO 404 page
// TODO add scrollTo top on route change to rescue the animation
// TODO get back redirect

const routes = [
  { path: "/dashboard", Component: Home },
  { path: "/feed", Component: News },
  { path: "/real_time", Component: RealTime },
];

const Router: React.FC = () => (
  <Suspense fallback={<h1>...loading</h1>}>
    <BrowserRouter>
      <Menu />
      <Nav />
      {routes.map(({ path, Component }) => (
        <ErrorBoundary key={path}>
          <Route exact path={path}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="route"
                unmountOnExit
              >
                <Component />
              </CSSTransition>
            )}
          </Route>
        </ErrorBoundary>
      ))}
      {/* <Redirect from="/" to="/dashboard" /> */}
    </BrowserRouter>
  </Suspense>
);

export default Router;
