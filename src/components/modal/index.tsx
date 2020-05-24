import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import { useClickAway } from "hooks/";
import { toggleModal } from "ducks/lists";

import styles from "./styles.scss";

type ModalProps = {
  onConfirm: (...args: any) => void;
  showModal: boolean;
  toggleModal: () => void;
};

type InnerProps = ModalProps;

const ModalWindow: React.FC<InnerProps> = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useClickAway(modalRef, () => dispatch(toggleModal()));

  return (
    <div className={styles.overlay}>
      <div className={styles.wrapper} ref={modalRef}>
        <p>modal</p>
      </div>
    </div>
  );
};

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
