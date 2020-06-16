import React from "react";
import { BsBackspace } from "react-icons/bs";

import styles from "./styles.scss";

const NotFound = () => (
  <div className={styles.wrapper}>
    <h1>Not found</h1>
    <BsBackspace size={30} color="#9a9a9a" />
  </div>
);

export default NotFound;
