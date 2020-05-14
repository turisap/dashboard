import React from "react";
import { MainExpensesGraph } from "components/home/ExpensesMain";
import { ExpenseGroupsPie } from "components/home/ExpensesGroupsPie";

import * as styles from "./home.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.homeGrid}>
      <div className={`${styles.chartCard} ${styles.mainChart}`}>
        <div className={styles.subhead}>Total per month</div>
        <div className={styles.chartCardHead}>Expenses</div>
        <MainExpensesGraph />
      </div>
      <div className={`${styles.chartCard} ${styles.pieGroups}`}>
        <div className={styles.subhead}>By groups</div>
        <div className={styles.chartCardHead}>This month</div>
        <ExpenseGroupsPie />
      </div>
    </div>
  );
};

export default Home;
