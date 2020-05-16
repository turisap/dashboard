import React, { lazy, Suspense } from "react";
import { BrowserRouter,  Route, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Home = lazy(() => import("routes/home"));
const News = lazy(() => import("routes/news"));
const RealTime = lazy(() => import("routes/realTime"));

import Menu from "components/menu";

// TODO Error boundaries for the whole app and each route
// TODO 404 page

const routes = [
  { path: "/dashboard", Component: Home },
  { path: "/feed", Component: News },
  { path: "/real_time", Component: RealTime },
];

const Router: React.FC = () => {
  return (
    <Suspense fallback={<h1>...loading</h1>}>
      <BrowserRouter>
        <Menu />
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
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
        ))}
        <Redirect from="/" to="/dashboard" />
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
