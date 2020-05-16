import React, { lazy } from "react";

const homePromise = import("./lazyHome");

const HomeComponent = lazy(() => homePromise);

const Home: React.FC = () => (
  <div style={{ gridArea: "page" }}>
    <HomeComponent />
  </div>
);

export default Home;
