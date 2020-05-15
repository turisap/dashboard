import React from "react";
import { TiInfinityOutline } from "react-icons/ti";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillAliwangwang } from "react-icons/ai";
import { AiOutlinePercentage } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";

import { MainExpensesGraph } from "components/home/ExpensesMain";
import { ExpenseGroupsPie } from "components/home/ExpensesGroupsPie";
import { EntertainmentGraph } from "components/home/EntertainmentGraph";
import { BillsGraph } from "components/home/BillsGraph";
import { LastWeekGraph } from "components/home/LastWeekGraph";

import * as styles from "./home.scss";

type GraphGroupProps = {
  styleName: string;
  text: string;
  subtext: string;
  icon: JSX.Element;
  graph: JSX.Element;
};

const GraphGroup: React.FC<GraphGroupProps> = ({
  styleName,
  text,
  icon,
  subtext,
  graph,
}) => (
  <div className={`${styles.chartCard} ${styleName}`}>
    <div className={styles.subhead}>{subtext}</div>
    <div className={styles.chartCardHead}>
      {icon}
      {text}
    </div>
    {graph}
  </div>
);

const Home: React.FC = () => {
  return (
    <div className={styles.homeGrid}>
      <GraphGroup
        styleName={styles.mainChart}
        graph={<MainExpensesGraph />}
        icon={<TiInfinityOutline color="#1f8ef1" />}
        text="Expenses"
        subtext="Total per month"
      />
      <GraphGroup
        styleName={styles.pieGroups}
        graph={<ExpenseGroupsPie />}
        icon={<AiOutlinePercentage color="#1f8ef1" />}
        text="This month"
        subtext="By group"
      />
      <GraphGroup
        styleName={styles.entertainment}
        graph={<EntertainmentGraph />}
        icon={<AiFillAliwangwang color="#e36f74" />}
        text="Leisure"
        subtext="Non-essentianl spendings"
      />
      <GraphGroup
        styleName={styles.basic}
        graph={<BillsGraph />}
        icon={<AiOutlineHome color="#6fe398" />}
        text="Monthly bills"
        subtext="Housing, food, utilities"
      />
      <GraphGroup
        styleName={styles.basic}
        graph={<BillsGraph />}
        icon={<AiOutlineHome color="#6fe398" />}
        text="Monthly bills"
        subtext="Housing, food, utilities"
      />
      <div className={styles.barsContainer}>
        <GraphGroup
          styleName={styles.lastWeek}
          graph={<LastWeekGraph />}
          icon={<AiOutlineDollarCircle color="#eefa87" />}
          text="Week"
          subtext="Last 7 days"
        />
      </div>
    </div>
  );
};

export default Home;
