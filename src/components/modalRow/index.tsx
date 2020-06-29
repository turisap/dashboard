import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
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
import { REDUCERS } from "types/*";
import {
  toggleModalButton,
  closeAllModals,
  TableTypes,
  ButtonTypes,
} from "ducks/lists";

import {
  getClickedExpenseMemo,
  getClickedIncomingMemo,
  getExpenseModalOpen,
  getIncomeModalOpen,
} from "./selectors";

import styles from "../additions/additions.scss";

const cx = classNames.bind((styles as unknown) as Record<string, string>);

const getUpdatingStates = (state: REDUCERS.RootState) =>
  state.lists.modalUpdatingState;

const ModalRow: React.FC = () => {
  const expense = useSelector(getClickedExpenseMemo);
  const incoming = useSelector(getClickedIncomingMemo);
  const expenseOpen = useSelector(getExpenseModalOpen);
  const incomeOpen = useSelector(getIncomeModalOpen);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeAllModals());
  const updatingStates = useSelector(getUpdatingStates, shallowEqual);

  const row = expenseOpen ? expense : incoming;
  const show = expenseOpen || incomeOpen;

  if (!row) return null;

  const {
    category,
    total,
    description,
    flagged,
    starred,
    synced,
    marked,
  } = row;

  const icon = expenseOpen ? (
    <AiFillDownCircle color="#e36f74" size="25" />
  ) : (
    <AiFillUpCircle color="#6fe398" size="25" />
  );

  const partialPayload = {
    id: row.id,
    type: (expenseOpen ? "expenses" : "incomings") as TableTypes,
  };

  const toggleItem = (item: ButtonTypes) => () =>
    dispatch(toggleModalButton.request({ ...partialPayload, item }));

  return (
    <Modal showModal={show} closeModal={closeModal}>
      <div className={styles.modalWrapper}>
        <p className={cx({ modalHead: true, expense })}>
          {icon}
          {category}
          <span className={styles.modalSummAdd}>${total}</span>
        </p>
        <p className={styles.modalSubhead}>{description}</p>

        <div className={styles.modalControls}>
          <div
            className={cx({
              modalBtn: true,
              modalBtnDisabled: updatingStates.starred !== "idle",
            })}
            onClick={toggleItem("starred")}
          >
            <AiFillStar
              id={styles.starIcon}
              size="30px"
              color={starred ? "#f8b704" : "#ffffff"}
            />
          </div>

          <div
            className={cx({
              modalBtn: true,
              modalBtnDisabled: updatingStates.marked !== "idle",
            })}
            onClick={toggleItem("marked")}
          >
            <AiOutlineWarning
              id={styles.starIcon}
              size="30px"
              color={marked ? "#d92929" : "#ffffff"}
            />
          </div>
          <div
            className={cx({
              modalBtn: true,
              modalBtnDisabled: updatingStates.synced !== "idle",
            })}
            onClick={toggleItem("synced")}
          >
            <AiOutlineSync
              id={styles.starIcon}
              size="30px"
              color={synced ? "#7aeb92" : "#ffffff"}
            />
          </div>
          <div
            className={cx({
              modalBtn: true,
              modalBtnDisabled: updatingStates.flagged !== "idle",
            })}
            onClick={toggleItem("flagged")}
          >
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
