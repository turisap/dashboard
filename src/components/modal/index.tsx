import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import { useClickAway } from "hooks/";

import styles from "./styles.scss";

type ModalProps = {
  onConfirm: (...args: string[] | number[]) => void;
  showModal: boolean;
  toggleModal: (id: number) => void;
};

type InnerProps = ModalProps;

const ModalWindow: React.FC<InnerProps> = ({ children, toggleModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useClickAway(modalRef, () => dispatch(toggleModal(0)));

  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({
  onConfirm,
  showModal,
  toggleModal,
  children,
}) => {
  const root = document.getElementById("modal-root");

  if (!root) return null;

  if (!showModal) return null;

  return createPortal(
    <ModalWindow
      onConfirm={onConfirm}
      showModal={showModal}
      toggleModal={toggleModal}
    >
      {children}
    </ModalWindow>,
    root
  );
};

export { Modal };
