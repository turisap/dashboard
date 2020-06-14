import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";
import pMinDelay from "p-min-delay";

import { Loader } from "../home";

const RealTimeComponent = loadable(
  () =>
    pMinDelay(
      timeout(import("./lazyPurchases"), process.env.ABORT_PAGE_TIMEOUT),
      parseInt(process.env.LOADER_DELAY as string)
    ),
  {
    fallback: <Loader />,
  }
);

const RealTime: React.FC = () => <RealTimeComponent />;

export default RealTime;
