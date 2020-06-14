import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";
import pMinDelay from "p-min-delay";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loader = () => (
  <div style={{ justifySelf: "center", alignSelf: "center" }}>
    <CircularProgress color="primary" size="200px" />
  </div>
);

export const HomeComponent = loadable(
  () =>
    pMinDelay(
      timeout(import("./lazyHome"), process.env.ABORT_PAGE_TIMEOUT),
      parseInt(process.env.LOADER_DELAY as string)
    ),
  {
    fallback: <Loader />,
  }
);

const Home: React.FC = () => <HomeComponent />;

export default Home;
