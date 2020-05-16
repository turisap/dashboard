import React, { lazy } from "react";

const realTimePromise = import("./lazyRealTime");

const RealTimeComponent = lazy(() => realTimePromise);

const RealTime: React.FC = () => (
  <div style={{ gridArea: "page" }}>
    <RealTimeComponent />
  </div>
);

export default RealTime;
