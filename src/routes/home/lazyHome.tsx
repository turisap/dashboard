import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiInfinityOutline } from "react-icons/ti";
import {
  AiOutlineDollarCircle,
  AiFillAliwangwang,
  AiOutlineHome,
  AiOutlineCompass,
  AiOutlineStop,
} from "react-icons/ai";

import { MainExpensesGraph } from "components/home/ExpensesMain";
import { ExpenseGroupsPie } from "components/home/ExpensesGroupsPie";
import { EntertainmentGraph } from "components/home/EntertainmentGraph";
import { BillsGraph } from "components/home/BillsGraph";
import { LastWeekGraph } from "components/home/LastWeekGraph";
import { OverBudgetGraph } from "components/home/OverBudget";

import { fetchGraphData } from "ducks/graphs";

import * as styles from "./home.scss";
import { REDUCERS, API } from "types/*";

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
  const dispatch = useDispatch();
  const graphData = useSelector<REDUCERS.RootState, API.GraphData>(
    (state) => state.graphs
  );

  useEffect(() => {
    if (!graphData.leisure.length) {
      dispatch(fetchGraphData.request());
    }
  }, []);

  // TODO add current months

  return (
    <div className={styles.homeGrid}>
      <GraphGroup
        styleName={styles.mainChart}
        graph={<MainExpensesGraph data={graphData.expenses} />}
        icon={<TiInfinityOutline color="#1f8ef1" />}
        text="Expenses"
        subtext="Total per month"
      />
      <GraphGroup
        styleName={styles.pieGroups}
        graph={<ExpenseGroupsPie data={graphData.thisMonth} />}
        icon={<AiOutlineCompass color="#1f8ef1" />}
        text="This month"
        subtext="By group"
      />
      <GraphGroup
        styleName={styles.entertainment}
        graph={<EntertainmentGraph data={graphData.leisure} />}
        icon={<AiFillAliwangwang color="#e36f74" />}
        text="Leisure"
        subtext="Non-essentianl spendings"
      />
      <GraphGroup
        styleName={styles.basic}
        graph={<BillsGraph data={graphData.monthlyBills} />}
        icon={<AiOutlineHome color="#6fe398" />}
        text="Monthly bills"
        subtext="Housing, food, utilities"
      />
      <div className={styles.barsContainer}>
        <GraphGroup
          styleName={styles.lastWeek}
          graph={<LastWeekGraph data={graphData.lastWeek} />}
          icon={<AiOutlineDollarCircle color="#eefa87" />}
          text="Week"
          subtext="Last 7 days"
        />
        <GraphGroup
          styleName={styles.overBudget}
          graph={<OverBudgetGraph data={graphData.overbudget} />}
          icon={<AiOutlineStop color="#ff8286" />}
          text="Overbudget"
          subtext="Excessive spendings"
        />
      </div>
    </div>
  );
};

export default Home;
