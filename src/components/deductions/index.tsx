import React from "react";
import { AiFillDownCircle, AiOutlineDelete, AiFillStar } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { fakeExpenses } from "../../mocks";
import { LoadingStatus } from "types/";

import styles from "./deductions.scss";

type Expense = {
  id: number;
  description: string;
  category: string;
  type: string;
  total: number;
  starred: boolean;
};

type IconsContainerProps = {
  status: LoadingStatus;
  id: number;
};

type ExpenseComponentProps = {
  index: number;
  style: React.CSSProperties;
  data: Expense[];
};

const tableHeaders = ["", "title", "category", "type", "total"];

const DeleteContainer: React.FC<IconsContainerProps> = ({ status }) => {
  return (
    <div className={styles.iconContainer}>
      {status === "idle" && (
        <div className="row-svg">
          <AiOutlineDelete size="20" />
          <AiOutlineDelete size="20" color="#d92929" />
        </div>
      )}
    </div>
  );
};

const Expense: React.FC<ExpenseComponentProps> = ({ index, style, data }) => {
  const { id, description, category, type, total, starred } = data[index];

  return (
    <div className={styles.expenseRow} key={index} style={style}>
      <AiFillStar
        id={styles.starIcon}
        color={starred ? "#f8b704" : "#ffffff"}
      />
      <p>{description}</p>
      <p>{category}</p>
      <p>{type}</p>
      <p>${total}</p>
      <DeleteContainer status="idle" id={id} />
    </div>
  );
};

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
          {tableHeaders.map(header => (
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
          {Expense}
        </List>
      </div>
    </div>
  );
};

export default Expenses;
