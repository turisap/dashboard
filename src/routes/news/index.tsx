import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";
import pMinDelay from "p-min-delay";

import { useScrollTop } from "hooks/";

import { Loader } from "../home";

export const NewsComponent = loadable(
  () =>
    pMinDelay(
      timeout(import("./lazyNews"), process.env.ABORT_PAGE_TIMEOUT),
      parseInt(process.env.LOADER_DELAY as string)
    ),
  {
    fallback: <Loader />,
  }
);

const News: React.FC = () => {
  useScrollTop();

  return <NewsComponent />;
};

export default News;
