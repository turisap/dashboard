import React from "react";
import { AiOutlineDelete, AiFillStar } from "react-icons/ai";

import {
  IconsContainerProps,
  VirtualRowProps,
  RowInfo,
  isExpense,
} from "types/";

import styles from "./additions.scss";

const DeleteContainer: React.FC<IconsContainerProps> = ({ status }) => {
  return (
    <div className={styles.iconContainer}>
      {status === "idle" && (
        <div className="row-svg">
          <AiOutlineDelete size="20" />
          <AiOutlineDelete size="20" color="#d92929" />
        </div>
      )}
    </div>
  );
};

const Row: React.FC<VirtualRowProps<RowInfo>> = ({ index, style, data }) => {
  const row = data[index];
  const { id, description, category, total, starred } = row;
  let saved = "";
  let type = "";

  if (isExpense(row)) {
    type = row.type;
  } else {
    saved = row.saved;
  }

  return (
    <div className={styles.expenseRow} key={index} style={style}>
      <AiFillStar
        id={styles.starIcon}
        color={starred ? "#f8b704" : "#ffffff"}
      />
      <p>{description}</p>
      <p>{category}</p>
      <p>{saved ? `$${saved}` : type}</p>
      <p>${total}</p>
      <DeleteContainer status="idle" id={id} />
    </div>
  );
};

export { Row };
