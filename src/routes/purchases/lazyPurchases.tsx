import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { fetchPurchases } from "ducks/purchases";

import styles from "./styles.scss";
import { REDUCERS, LoadingStatus, API } from "types/*";

type PurchaseItem = API.Purchase & {
  ref: MutableRefObject<any>;
};

const PurchaseItem: React.FC<PurchaseItem> = React.forwardRef(
  ({ title, description, image, lquip }, ref) => (
    <div className={`${styles.purchaseWrapper} lazy`} ref={ref}>
      <img
        src={lquip}
        data-img={image}
        className={styles.purchaseImage}
        data-lazy="lazy"
      />
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
);

PurchaseItem.displayName = "PurchaseItem";

// TODO move all selectors to the respective folder
// TODO rename all reselect selectors to end with memo
// TODO check how selectors work
const getPageStatus = (state: REDUCERS.RootState) => state.purchases.pageStatus;
const getPurchaseList = (state: REDUCERS.RootState) =>
  state.purchases.purchases;

const getPurchasesListMemo = createSelector(getPurchaseList, (list) => list);

const PurchasesPage: React.FC = () => {
  const dispatch = useDispatch();
  const root = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const pageStatus = useSelector<REDUCERS.RootState, LoadingStatus>(
    getPageStatus
  );
  const purchases = useSelector<REDUCERS.RootState, API.PurchasesList>(
    getPurchasesListMemo
  );

  // TODO add the same requrring request prohibition to other pages
  useEffect(() => {
    if (pageStatus === "prestine") {
      dispatch(fetchPurchases.request());
    }
  }, []);

  useEffect(() => {
    const opt = {
      root: root.current,
      threshold: 0.5,
    };
  }, []);

  useEffect(() => {
    const withRefs: PurchaseItem[] = purchases.map(
      (item: PurchaseItem) =>
        ({
          ...item,
          ref: React.createRef<HTMLDivElement>(),
        } as PurchaseItem)
    );

    setItems(withRefs);
  }, [purchases]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner} ref={root}>
        {items.map((purchase: PurchaseItem) => (
          <PurchaseItem key={purchase.id} {...purchase} ref={purchase.ref} />
        ))}
      </div>
    </div>
  );
};

export default PurchasesPage;
