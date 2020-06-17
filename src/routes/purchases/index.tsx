import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";

import { Loader } from "../home";

import { useScrollTop } from "hooks/";

export const PurchasesComponent = loadable(
  () => timeout(import("./lazyPurchases"), process.env.ABORT_PAGE_TIMEOUT),
  {
    fallback: <Loader />,
  }
);

const RealTime: React.FC = () => {
  useScrollTop();

  return <PurchasesComponent />;
};

export default RealTime;
