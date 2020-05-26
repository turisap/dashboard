import React from "react";
import {
  AiFillUpCircle,
  AiFillStar,
  AiOutlineFlag,
  AiOutlineWarning,
  AiOutlineSync,
} from "react-icons/ai";

import { Modal } from "components/modal";
import { RowInfo } from "types/*";

import styles from "./additions.scss";

type ModalRowProps = {
  show: boolean;
  row: RowInfo;
  closeModal: () => void;
};

const ModalRow: React.FC<ModalRowProps> = ({ show, row, closeModal }) => {
  const { category, total, description, flagged, starred } = row;

  return (
    <Modal
      onConfirm={() => console.log()}
      showModal={show}
      closeModal={closeModal}
    >
      <div className={styles.modalWrapper}>
        <p className={styles.modalHead}>
          <AiFillUpCircle color="#6fe398" size="25" /> {category}
          <span className={styles.modalSummAdd}>${total}</span>
        </p>
        <p className={styles.modalSubhead}>{description}</p>

        <div className={styles.modalControls}>
          <div className={styles.modalBtn}>
            <AiFillStar
              id={styles.starIcon}
              size="30px"
              color={starred ? "#f8b704" : "#ffffff"}
            />
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
  );
};

export { ModalRow };
