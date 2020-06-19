import React from "react";
import { Skeleton } from "@material-ui/lab";
import { AiOutlineDelete, AiFillStar } from "react-icons/ai";
import classNames from "classnames/bind";

import {
  IconsContainerProps,
  VirtualRowProps,
  RowInfoInner,
  UTILS,
} from "types/";

import styles from "./additions.scss";

const cx = classNames.bind((styles as unknown) as Record<string, string>);

const DeleteContainer: React.FC<IconsContainerProps> = ({ status }) => {
  return (
    <div className={styles.iconContainer}>
      {status === "prestine" && (
        <div className="row-svg">
          <AiOutlineDelete size="20" />
          <AiOutlineDelete size="20" color="#d92929" />
        </div>
      )}
    </div>
  );
};

type SkeletonProps = {
  animation: "wave" | "pulse" | false;
  variant: "text";
  height: string;
  width: string;
  style?: React.CSSProperties;
};

const Row: React.FC<VirtualRowProps<RowInfoInner>> = ({
  index,
  style,
  data,
}) => {
  const row = data[index];
  const { id, description, category, total, starred, loading } = row;
  let saved = "";
  let type = "";

  if (UTILS.isExpense(row)) {
    type = row.type;
  } else {
    saved = row.saved;
  }

  const rowMarkup = (
    <>
      <AiFillStar
        id={styles.starIcon}
        color={starred ? "#f8b704" : "#ffffff"}
      />
      <p>{description}</p>
      <p>{category}</p>
      <p>{saved ? `$${saved}` : type}</p>
      <p>${total}</p>
      <DeleteContainer status="prestine" id={id} />
    </>
  );

  const commonSkeletonProps: SkeletonProps = {
    animation: "wave",
    variant: "text",
    height: "40px",
    width: "70%",
  };

  const skeletonedRow = (
    <>
      <Skeleton {...commonSkeletonProps} style={{ marginLeft: "10px" }} />
      <Skeleton
        {...commonSkeletonProps}
        style={{ marginLeft: "10px" }}
        width="90%"
      />
      <Skeleton {...commonSkeletonProps} />
      <Skeleton {...commonSkeletonProps} />
      <Skeleton {...commonSkeletonProps} />
      <Skeleton
        {...commonSkeletonProps}
        width="30%"
        style={{ marginLeft: "30%" }}
      />
    </>
  );

  return (
    <div
      className={cx({ expenseRow: true, expenseRowLoading: loading })}
      key={index}
      style={style}
      onClick={row.openModal(row.id)}
    >
      {loading ? skeletonedRow : rowMarkup}
    </div>
  );
};

export { Row };
