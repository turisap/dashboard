import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import Expenses from "components/deductions";
import Additions from "components/additions";
import { ModalRow } from "components/additions/ModalRow";

import { REDUCERS, API } from "types/";
import { closeAllModals } from "ducks/lists";

import styles from "./styles.scss";

const getExpenseModalOpen = (state: REDUCERS.RootState) =>
  state.lists.expenseModalOpen;

const getIncomeModalOpen = (state: REDUCERS.RootState) =>
  state.lists.incomingModalOpen;

const getIncomeClickedId = (state: REDUCERS.RootState) =>
  state.lists.selectedIncomeId;

const getExpenseClickedId = (state: REDUCERS.RootState) =>
  state.lists.selectedExpenseId;

const getExpenses = (state: REDUCERS.RootState) => state.lists.expenses;
const getIncomings = (state: REDUCERS.RootState) => state.lists.incomings;

const getClickedExpense = createSelector(
  [getExpenses, getExpenseClickedId],
  (expenses, clickedId) =>
    expenses.find((expense) => expense.id === clickedId) as API.Expense
);

const getClickedIncoming = createSelector(
  [getIncomings, getIncomeClickedId],
  (incomings, clickedId) =>
    incomings.find((incoming) => incoming.id === clickedId) as API.Incoming
);

const News: React.FC = () => {
  const expense = useSelector(getClickedExpense);
  const incoming = useSelector(getClickedIncoming);
  const expenseOpen = useSelector(getExpenseModalOpen);
  const incomeOpen = useSelector(getIncomeModalOpen);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeAllModals());

  const row = expenseOpen ? expense : incoming;
  const showModal = expenseOpen || incomeOpen;

  return (
    <div className={styles.newsPage}>
      <Expenses />
      <Additions />
      <ModalRow
        show={showModal}
        row={row}
        closeModal={closeModal}
        expense={expenseOpen}
      />
    </div>
  );
};

export default News;
