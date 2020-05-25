import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  AiFillUpCircle,
  AiFillStar,
  AiOutlineFlag,
  AiOutlineWarning,
  AiOutlineSync,
} from "react-icons/ai";
import { FixedSizeList as List } from "react-window";

import { Modal } from "components/modal";
import { REDUCERS, API } from "types/";

import { toggleModal } from "ducks/lists";

import { Row } from "./Row";

import styles from "./additions.scss";

const tableHeaders = ["", "title", "category", "saved", "total"];

const getClickedId = (state: REDUCERS.RootState) => state.lists.selectedId;

const getIncomings = createSelector(
  (state: REDUCERS.RootState) => state.lists,
  (lists) => lists.incomings
);

const getClickedRowInfo = createSelector(
  [getIncomings, getClickedId],
  (incomings, selectedId) =>
    incomings.find((item) => item.id === selectedId) as API.Incoming
);

const getShowModal = (state: REDUCERS.RootState) => state.lists.modalOpen;

const Incomings: React.FC = () => {
  const incomings = useSelector(getIncomings);
  const showModal = useSelector(getShowModal);
  const modalRow = useSelector(getClickedRowInfo);
  const dispatch = useDispatch();

  const { description, category, total, flagged, starred } = modalRow;

  const openModal = (id: number) => () => dispatch(toggleModal(id));
  const withDisp = incomings.map((inc) => ({
    ...inc,
    openModal,
  }));

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
      >
        <div className={styles.modalWrapper}>
          <p className={styles.modalHead}>
            <AiFillUpCircle color="#6fe398" size="25" /> {category}
            <span className={styles.modalSummAdd}>${total}</span>
          </p>
          <p className={styles.modalSubhead}>{description}</p>

          <div className={styles.modalControls}>
            <div className={styles.modalBtn}>
              <AiFillStar id={styles.starIcon} size="30px" color="#f8b704" />
            </div>

            <div className={styles.modalBtn}>
              <AiOutlineWarning
                id={styles.starIcon}
                size="30px"
                color="#d92929"
              />
            </div>
            <div className={styles.modalBtn}>
              <AiOutlineSync id={styles.starIcon} size="30px" color="#6fe398" />
            </div>
            <div className={styles.modalBtn}>
              <AiOutlineFlag
                id={styles.starIcon}
                size="30px"
                color={flagged ? "#f8b704" : "#ffffff"}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Incomings;
