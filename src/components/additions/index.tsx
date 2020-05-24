import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { AiFillUpCircle } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { Modal } from "components/modal";
import { REDUCERS } from "types/";

import { toggleModal } from "ducks/lists";

import { Row } from "./Row";

import styles from "./additions.scss";

const tableHeaders = ["", "title", "category", "saved", "total"];

const getIncomings = createSelector(
  (state: REDUCERS.RootState) => state.lists,
  (lists) => lists.incomings
);

const getShowModal = (state: REDUCERS.RootState) => state.lists.modalOpen;

const Incomings: React.FC = () => {
  const incomings = useSelector(getIncomings);
  const showModal = useSelector(getShowModal);
  const dispatch = useDispatch();

  const openModal = () => dispatch(toggleModal());
  const withDisp = incomings.map((inc) => ({ ...inc, openModal }));

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
          itemData={withDisp}
          itemSize={50}
          width={"calc(100% + 20px)"}
        >
          {Row}
        </List>
      </div>
      <Modal
        onConfirm={() => console.log()}
        showModal={showModal}
        toggleModal={() => console.log("j")}
      />
    </div>
  );
};

export default Incomings;
