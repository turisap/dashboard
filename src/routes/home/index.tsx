import React from "react";
import { MainExpensesGraph } from "components/home/ExpensesMain";

// TODO add meta tag initial scale to html template from your gist

import * as styles from "./home.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.homeGrid}>
      <div className={`${styles.chartCard} ${styles.mainChart}`}>
        <div className={styles.subhead}>Total per month</div>
        <div className={styles.chartCardHead}>Expenses</div>
        <MainExpensesGraph />
      </div>
    </div>
  );
};

export default Home;
