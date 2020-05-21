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
const Expense: React.FC<Expense> = ({
  id,
  description,
  category,
  type,
  total,
  starred
}) => (
  <div className={styles.expenseRow}>
    <AiFillStar id={styles.starIcon} color={starred ? "#f8b704" : "#ffffff"} />
    <p>{description}</p>
    <p>{category}</p>
    <p>{type}</p>
    <p>${total}</p>
    <DeleteContainer status="idle" id={id} />
  </div>
);

const Expenses: React.FC = () => {
  const expenses = fakeExpenses(100);

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
          <List height={500} itemsCount={500} itemSize={35} width={300}>
            {Expense}
          </List>
        </div>
      </div>
    </div>
  );
};
// {expenses.map((expense: Expense) => (
//   <Expense key={expense.id} {...expense} />
// ))}

export default Expenses;
