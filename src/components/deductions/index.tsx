import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDownCircle } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { REDUCERS } from "types/";
import { useDelayedLoading } from "hooks/";
import { toggleExpenseModal } from "ducks/lists";

import { Row } from "../additions/Row";
import styles from "./deductions.scss";

const tableHeaders = ["", "title", "category", "type", "total"];

const getExpenses = (state: REDUCERS.RootState) => state.lists.expenses;
const getStatus = (state: REDUCERS.RootState) => state.lists.expensesStatus;

const Expenses: React.FC = () => {
  const expenses = useSelector(getExpenses);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();
  const loading = useDelayedLoading(200, status);

  const stubLength = 20;
  const openModal = (id: number) => () => dispatch(toggleExpenseModal(id));

  const withDisp = expenses.length
    ? expenses.map((exp) => ({
        ...exp,
        openModal,
      }))
    : new Array(stubLength).fill({ loading, openModal });

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
          itemCount={expenses.length || stubLength}
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

Expenses.displayName = "Expenses";

export default Expenses;
