import React, { useRef } from "react";
import { createPortal } from "react-dom";

import { useClickAway } from "hooks/";

import styles from "./styles.scss";

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
};

type InnerProps = ModalProps;

const ModalWindow: React.FC<InnerProps> = ({ children, closeModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickAway(modalRef, closeModal);

  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, children }) => {
  const root = document.getElementById("modal-root");

  if (!root) return null;

  if (!showModal) return null;

  return createPortal(
    <ModalWindow showModal={showModal} closeModal={closeModal}>
      {children}
    </ModalWindow>,
    root
  );
};

export { Modal };
