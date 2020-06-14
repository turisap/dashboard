import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { createSelector } from "reselect";

import Expenses from "components/deductions";
import Additions from "components/additions";
import { ModalRow } from "components/modalRow";

import { fetchAllExpenses, fetchAllIncomings } from "ducks/lists";

import styles from "./styles.scss";
import { REDUCERS } from "types/*";

const expenses = (state: REDUCERS.RootState) => state.lists.expenses;

const expensesLength = createSelector(
  [expenses],
  (expenses) => expenses.length === 0
);

const News: React.FC = () => {
  const dispatch = useDispatch();
  const shouldFetch = useSelector<REDUCERS.RootState, boolean>(expensesLength);

  useEffect(() => {
    if (shouldFetch) {
      batch(() => {
        dispatch(fetchAllExpenses.request());
        dispatch(fetchAllIncomings.request());
      });
    }
  }, []);

  return (
    <div className={styles.newsPage}>
      <Expenses />
      <Additions />
      <ModalRow />
    </div>
  );
};

export default News;
