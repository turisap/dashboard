import React, { lazy } from "react";

const newsPromise = import("./lazyNews");

const NewsComponent = lazy(() => newsPromise);

const News: React.FC = () => (
  <div style={{ gridArea: "page" }}>
    <NewsComponent />
  </div>
);

export default News;
