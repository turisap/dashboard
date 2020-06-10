import React from "react";

import styles from "./styles.scss";

const fakeGoods = Array(21).fill({});

const PurchaseItem = () => <div className={styles.purchaseWrapper}>ololo</div>;

const RealTime: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.wrapperInner}>
      {fakeGoods.map((purchase, idx) => (
        <PurchaseItem key={idx} {...purchase} />
      ))}
    </div>
  </div>
);

export default RealTime;
