import React from "react";

import Expenses from "components/deductions";
import Additions from "components/additions";

import styles from "./styles.scss";

const News: React.FC = () => (
  <div className={styles.newsPage}>
    <Expenses />
    <Additions />
  </div>
);

export default News;
