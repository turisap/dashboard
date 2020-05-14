import React from "react";
import { MainExpensesGraph } from "components/home/ExpensesMain";
import { ExpenseGroupsPie } from "components/home/ExpensesGroupsPie";
import { EntertainmentGraph } from "components/home/EntertainmentGraph";
import { BillsGraph } from "components/home/BillsGraph";
import { TiInfinityOutline } from "react-icons/ti";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillAliwangwang } from "react-icons/ai";
import { AiOutlinePercentage } from "react-icons/ai";

import * as styles from "./home.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.homeGrid}>
      <div className={`${styles.chartCard} ${styles.mainChart}`}>
        <div className={styles.subhead}>Total per month</div>
        <div className={styles.chartCardHead}>
          <TiInfinityOutline color="#1f8ef1" /> Expenses
        </div>
        <MainExpensesGraph />
      </div>
      <div className={`${styles.chartCard} ${styles.pieGroups}`}>
        <div className={styles.subhead}>By group</div>
        <div className={styles.chartCardHead}>
          <AiOutlinePercentage color="#1f8ef1" />
          This month
        </div>
        <ExpenseGroupsPie />
      </div>
      <div className={`${styles.chartCard} ${styles.entertainment}`}>
        <div className={styles.subhead}>Non-essential spendings</div>
        <div className={styles.chartCardHead}>
          <AiFillAliwangwang color="#e36f74" />
          Leisure
        </div>
        <EntertainmentGraph />
      </div>
      <div className={`${styles.chartCard} ${styles.basic}`}>
        <div className={styles.subhead}>Housing, food, utilities</div>
        <div className={styles.chartCardHead}>
          <AiOutlineHome color="#6fe398" />
          Monthly bills
        </div>
        <BillsGraph />
      </div>
    </div>
  );
};

export default Home;
