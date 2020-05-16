import React from "react";

import styles from "./styles.scss";

const Nav: React.FC = () => (
  <div className={styles.nav}>
    <img src="assets/avatar.png" className={styles.image} />
  </div>
);

export default Nav;
