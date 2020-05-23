import React from "react";
import { AiFillDownCircle } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { Row } from "../additions/Row";
import { fakeExpenses } from "../../mocks";

import styles from "./deductions.scss";

const tableHeaders = ["", "title", "category", "type", "total"];

const Expenses: React.FC = () => {
  const ITEMS_COUNT = 10000;
  const expenses = fakeExpenses(ITEMS_COUNT);

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
          itemCount={ITEMS_COUNT}
          itemData={expenses}
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
