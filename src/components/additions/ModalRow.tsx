import React from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import {
  AiFillUpCircle,
  AiFillDownCircle,
  AiFillStar,
  AiOutlineFlag,
  AiOutlineWarning,
  AiOutlineSync,
} from "react-icons/ai";

import { Modal } from "components/modal";
import { RowInfo } from "types/*";
import { toggleModalButton, TableTypes, ButtonTypes } from "ducks/lists";

import styles from "./additions.scss";

const cx = classNames.bind((styles as unknown) as Record<string, string>);

type ModalRowProps = {
  show: boolean;
  expense: boolean;
  row: RowInfo;
  closeModal: () => void;
};

const ModalRow: React.FC<ModalRowProps> = ({
  show,
  row,
  closeModal,
  expense,
}) => {
  if (!row) return null;

  const dispatch = useDispatch();

  const {
    category,
    total,
    description,
    flagged,
    starred,
    synced,
    marked,
  } = row;

  const icon = expense ? (
    <AiFillDownCircle color="#e36f74" size="25" />
  ) : (
    <AiFillUpCircle color="#6fe398" size="25" />
  );

  const partialPayload = {
    id: row.id,
    type: (expense ? "expenses" : "incomings") as TableTypes,
  };

  const toggleItem = (item: ButtonTypes) => () =>
    dispatch(toggleModalButton.request({ ...partialPayload, item }));

  return (
    <Modal
      onConfirm={() => console.log()}
      showModal={show}
      closeModal={closeModal}
    >
      <div className={styles.modalWrapper}>
        <p className={cx({ modalHead: true, expense })}>
          {icon}
          {category}
          <span className={styles.modalSummAdd}>${total}</span>
        </p>
        <p className={styles.modalSubhead}>{description}</p>

        <div className={styles.modalControls}>
          <div className={styles.modalBtn} onClick={toggleItem("starred")}>
            <AiFillStar
              id={styles.starIcon}
              size="30px"
              color={starred ? "#f8b704" : "#ffffff"}
            />
          </div>

          <div className={styles.modalBtn} onClick={toggleItem("marked")}>
            <AiOutlineWarning
              id={styles.starIcon}
              size="30px"
              color={marked ? "#d92929" : "#ffffff"}
            />
          </div>
          <div className={styles.modalBtn} onClick={toggleItem("synced")}>
            <AiOutlineSync
              id={styles.starIcon}
              size="30px"
              color={synced ? "#7aeb92" : "#ffffff"}
            />
          </div>
          <div className={styles.modalBtn} onClick={toggleItem("flagged")}>
            <AiOutlineFlag
              id={styles.starIcon}
              size="30px"
              color={flagged ? "#6bc1f2" : "#ffffff"}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ModalRow };
