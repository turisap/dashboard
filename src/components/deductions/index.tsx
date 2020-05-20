import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { AiFillDownCircle, AiOutlineDelete, AiFillStar } from "react-icons/ai";

import { fakeExpenses } from "../../mocks";
import { LoadingStatus } from "types/";

import styles from "./deductions.scss";

type Expense = {
  id: number;
  description: string;
  category: string;
  type: string;
  total: number;
};

type IconsContainerProps = {
  status: LoadingStatus;
  id: number;
};

const tableHeaders = ["title", "category", "type", "total"];

const DeleteContainer: React.FC<IconsContainerProps> = ({ status }) => {
  console.log(status);
  return (
    <div className={styles.iconContainer}>
      {status === "idle" && (
        <>
          <AiOutlineDelete size="20" />
          <AiOutlineDelete size="20" color="#d92929" />
        </>
      )}
      {status === "loading" && <ClipLoader />}
    </div>
  );
};
const Expense: React.FC<Expense> = ({
  id,
  description,
  category,
  type,
  total
}) => (
  <div className={styles.expenseRow}>
    <p>
      <AiFillStar />
      {description}
    </p>
    <p>{category}</p>
    <p>{type}</p>
    <p>${total}</p>
    <DeleteContainer status="loading" id={id} />
  </div>
);

const Expenses: React.FC = () => {
  const expenses = fakeExpenses(300);

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
        {expenses.map((expense: Expense) => (
          <Expense key={expense.id} {...expense} />
        ))}
      </div>
    </div>
  );
};

export default Expenses;
