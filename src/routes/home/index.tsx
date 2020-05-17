import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";

// TODO delay for flashing loader
const HomeComponent = loadable(() => timeout(import("./lazyHome"), 7000), {
  fallback: <div>...home loading</div>,
});

const Home: React.FC = () => (
  <div style={{ gridArea: "page" }}>
    <HomeComponent />
  </div>
);

export default Home;
