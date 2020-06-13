import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";

// TODO delay for flashing loader
const RealTimeComponent = loadable(
  () => timeout(import(/* webpackPrefetch: true */ "./lazyPurchases"), 7000),
  {
    fallback: <div>...realtime loading</div>,
  }
);

// TODO delay for flashing loader
const RealTime: React.FC = () => <RealTimeComponent />;

export default RealTime;