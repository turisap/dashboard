import React from "react";
import { createPortal } from "react-dom";

import styles from "./styles.scss";

type ModalProps = {
  onConfirm: (...args: any) => void;
  showModal: boolean;
  toggleModal: () => void;
};

type InnerProps = ModalProps;

const ModalWindow: React.FC<InnerProps> = () => (
  <div className={styles.overlay}>
    <div className={styles.wrapper}>
      <p>modal</p>
    </div>
  </div>
);

const Modal: React.FC<ModalProps> = ({ onConfirm, showModal, toggleModal }) => {
  const root = document.getElementById("modal-root");

  if (!root) return null;

  if (!showModal) return null;

  return createPortal(
    <ModalWindow
      onConfirm={onConfirm}
      showModal={showModal}
      toggleModal={toggleModal}
    />,
    root
  );
};

export { Modal };
