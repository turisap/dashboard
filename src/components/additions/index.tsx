import React from "react";
import { AiFillUpCircle } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { fakeIncomings } from "../../mocks";
import { Row } from "./Row";

import styles from "./additions.scss";

const tableHeaders = ["", "title", "category", "saved", "total"];

const Expenses: React.FC = () => {
  const ITEMS_COUNT = 10000;
  const incomes = fakeIncomings(ITEMS_COUNT);

  return (
    <div className={styles.container}>
      <h4>List of incomings</h4>
      <h3>
        <AiFillUpCircle color="#6fe398" size="25" /> Income
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
          itemData={incomes}
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
