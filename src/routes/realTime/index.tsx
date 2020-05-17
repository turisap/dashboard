import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";

// TODO delay for flashing loader
const RealTimeComponent = loadable(
  () => timeout(import(/* webpackPrefetch: true */ "./lazyRealTime"), 7000),
  {
    fallback: <div>...realtime loading</div>,
  }
);

// TODO delay for flashing loader
const RealTime: React.FC = () => (
  <div style={{ gridArea: "page" }}>
    <RealTimeComponent />
  </div>
);

export default RealTime;
