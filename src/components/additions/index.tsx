import React from "react";
import { AiFillUpCircle, AiOutlineDelete, AiFillStar } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { fakeIncomings } from "../../mocks";
import { LoadingStatus } from "types/";

import styles from "./additions.scss";

type Incoming = {
  id: number;
  description: string;
  category: string;
  saved: string;
  total: number;
  starred: boolean;
};

export type IconsContainerProps = {
  status: LoadingStatus;
  id: number;
};

export type VirtualRowProps<T> = {
  index: number;
  style: React.CSSProperties;
  data: T[];
};

const tableHeaders = ["", "title", "category", "saved", "total"];

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

const Expense: React.FC<VirtualRowProps<Incoming>> = ({
  index,
  style,
  data
}) => {
  const { id, description, category, saved, total, starred } = data[index];

  return (
    <div className={styles.expenseRow} key={index} style={style}>
      <AiFillStar
        id={styles.starIcon}
        color={starred ? "#f8b704" : "#ffffff"}
      />
      <p>{description}</p>
      <p>{category}</p>
      <p>${saved}</p>
      <p>${total}</p>
      <DeleteContainer status="idle" id={id} />
    </div>
  );
};

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
          {tableHeaders.map(header => (
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
          {Expense}
        </List>
      </div>
    </div>
  );
};

export default Expenses;
