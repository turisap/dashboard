import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";

import { useScrollTop } from "hooks/";

import { Loader } from "../home";

export const NewsComponent = loadable(
  () => timeout(import("./lazyNews"), process.env.ABORT_PAGE_TIMEOUT),
  {
    fallback: <Loader />,
  }
);

const News: React.FC = () => {
  useScrollTop();

  return <NewsComponent />;
};

export default News;
