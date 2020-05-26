import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { AiFillDownCircle } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { REDUCERS, API } from "types/";
import { toggleExpenseModal } from "ducks/lists";

import { Row } from "../additions/Row";
import { ModalRow } from "../additions/ModalRow";
import styles from "./deductions.scss";

const tableHeaders = ["", "title", "category", "type", "total"];

const getExpenses = (state: REDUCERS.RootState) => state.lists.expenses;
const getModalOpen = (state: REDUCERS.RootState) =>
  state.lists.expenseModalOpen;
const getClickedId = (state: REDUCERS.RootState) => state.lists.selectedId;
const getClickedRowInfo = createSelector(
  [getExpenses, getClickedId],
  (expenses, clickedId) =>
    expenses.find((expense) => expense.id === clickedId) as API.Expense
);

const Expenses: React.FC = () => {
  const expenses = useSelector(getExpenses);
  const modalOpen = useSelector(getModalOpen);
  const row = useSelector(getClickedRowInfo);
  const dispatch = useDispatch();

  const withDisp = expenses.map((exp) => ({
    ...exp,
    openModal: (id: number) => () => dispatch(toggleExpenseModal(id)),
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
      <ModalRow show={modalOpen} row={row} toggleModal={toggleExpenseModal} />
    </div>
  );
};

export default Expenses;
