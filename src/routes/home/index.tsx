import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";
import { CircularProgress } from "@material-ui/core";

import { useScrollTop } from "hooks/";

export const Loader = () => (
  <div style={{ gridArea: "page", placeSelf: "center" }}>
    <CircularProgress color="primary" size="100px" />
  </div>
);

export const HomeComponent = loadable(
  () => timeout(import("./lazyHome"), process.env.ABORT_PAGE_TIMEOUT),
  {
    fallback: <Loader />,
  }
);

const Home: React.FC = () => {
  useScrollTop();

  return <HomeComponent />;
};

export default Home;
