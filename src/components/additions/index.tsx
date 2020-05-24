import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { AiFillUpCircle } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { Modal } from "components/modal";
import { useModal } from "hooks/";
import { REDUCERS } from "types/";

import { Row } from "./Row";

import styles from "./additions.scss";

const tableHeaders = ["", "title", "category", "saved", "total"];

const getIncomings = createSelector(
  (state: REDUCERS.RootState) => state.lists,
  (lists) => lists.incomings
);

const Expenses: React.FC = () => {
  const [showModal, toggleModal] = useModal();
  const incomings = useSelector(getIncomings);

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
          itemCount={incomings.length}
          itemData={incomings}
          itemSize={50}
          width={"calc(100% + 20px)"}
        >
          {Row}
        </List>
      </div>
      <Modal
        onConfirm={() => console.log()}
        showModal={showModal}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Expenses;
