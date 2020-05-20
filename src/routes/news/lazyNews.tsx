import React from "react";

import Expenses from "components/deductions";

import styles from "./styles.scss";

const News: React.FC = () => (
  <div className={styles.newsPage}>
    <Expenses />
  </div>
);

export default News;
