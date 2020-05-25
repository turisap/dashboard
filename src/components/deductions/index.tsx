import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { AiFillDownCircle } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { Row } from "../additions/Row";
import { REDUCERS } from "types/";

import styles from "./deductions.scss";

const tableHeaders = ["", "title", "category", "type", "total"];

const getExpenses = createSelector(
  (state: REDUCERS.RootState) => state.lists,
  (lists) => lists.expenses
);

const Expenses: React.FC = () => {
  const expenses = useSelector(getExpenses);
  const withDisp = expenses.map((exp) => ({
    ...exp,
    openModal: (id: number) => () => console.log(id),
  }));

  return (
    <div className={styles.container}>
      <h4>List of expenditures</h4>
      <h3>
        <AiFillDownCircle color="#e36f74" size="25" /> Spendings
      </h3>
      <div className={styles.table}>
        <div className={styles.expenseHeaders}>
          {tableHeaders.map((header) => (
            <p key={header}>{header}</p>
          ))}
        </div>
        <List
          height={365}
          itemCount={expenses.length}
          itemData={withDisp}
          itemSize={50}
          width={"calc(100% + 20px)"}
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default Expenses;
