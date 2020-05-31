import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillUpCircle } from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { REDUCERS, API } from "types/";
import { toggleIncomingModal } from "ducks/lists";

import { Row } from "./Row";

import styles from "./additions.scss";

const tableHeaders = ["", "title", "category", "saved", "total"];

const getIncomings = (state: REDUCERS.RootState) => state.lists.incomings;

const Incomings: React.FC = () => {
  const incomings = useSelector(getIncomings);
  const dispatch = useDispatch();

  const openModal = (id: number) => () => dispatch(toggleIncomingModal(id));
  const withDisp = incomings.map((inc) => ({
    ...inc,
    openModal,
  }));

  return (
    <div className={styles.container}>
      <h4>List of incomings</h4>
      <h3>
        <AiFillUpCircle color="#6fe398" size="25" /> Incomings
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
    </div>
  );
};

export default Incomings;
