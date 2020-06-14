import React, { useEffect } from "react";
import { useDispatch, batch } from "react-redux";

import Expenses from "components/deductions";
import Additions from "components/additions";
import { ModalRow } from "components/modalRow";

import { fetchAllExpenses, fetchAllIncomings } from "ducks/lists";

import styles from "./styles.scss";

const News: React.FC = () => {
  // TODO add forbidding refetch
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(fetchAllExpenses.request());
      dispatch(fetchAllIncomings.request());
    });
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
