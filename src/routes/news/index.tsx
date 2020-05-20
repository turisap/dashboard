import React from "react";
import loadable from "@loadable/component";
import { timeout } from "promise-timeout";

// TODO delay for flashing loader
const NewsComponent = loadable(
  () => timeout(import(/* webpackPreload: true */ "./lazyNews"), 7000),
  {
    fallback: <div>...news loading hey</div>,
  }
);

const News: React.FC = () => <NewsComponent />;

export default News;
