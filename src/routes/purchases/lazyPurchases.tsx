import React, { useState, useEffect, useRef, RefObject } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { times } from "ramda";

import { fetchPurchases } from "ducks/purchases";

import styles from "./styles.scss";
import { REDUCERS, LoadingStatus, API } from "types/*";

type PurchaseItem = API.Purchase & {
  ref: RefObject<HTMLImageElement>;
};

const getPageStatus = (state: REDUCERS.RootState) => state.purchases.pageStatus;
const getPurchaseList = (state: REDUCERS.RootState) =>
  state.purchases.purchases;

const getPurchasesListMemo = createSelector(getPurchaseList, (list) => list);

const SkeletonPurchase: React.FC = () => (
  <div>
    <Skeleton variant="rect" width="100%" height="350px" />
    <Skeleton variant="text" width="30%" style={{ margin: "16px 0 0 0" }} />
    <Skeleton variant="text" width="80%" style={{ margin: "16px 0" }} />
  </div>
);

const PurchaseItem: React.FC<API.Purchase> = React.forwardRef(
  ({ title, description, image, lquip }, ref: RefObject<HTMLImageElement>) => (
    <div className={styles.purchaseWrapper}>
      <img
        src={lquip}
        data-img={image}
        className={styles.purchaseImage}
        ref={ref}
      />
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
);

PurchaseItem.displayName = "PurchaseItem";

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

  // TODO extract to a custom hook
  useEffect(() => {
    const withRefs = purchases.map((item) => ({
      ...item,
      ref: React.createRef<HTMLImageElement>(),
    }));

    setItems(withRefs);
  }, [purchases]);

  useEffect(() => {
    if (items.length) {
      const opt = {
        root: root.current,
        threshold: 1,
      };

      const observerCallback = (entries, observer) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            const link = target.dataset.img;

            target.src = link;
            observer.unobserve(target);
          }
        });
      };

      const imageObserver = new IntersectionObserver(observerCallback, opt);

      items.forEach(({ ref }) => {
        if (ref) {
          imageObserver.observe(ref.current as HTMLImageElement);
        }
      });
    }
  }, [items]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner} ref={root}>
        {items.length
          ? items.map((purchase: PurchaseItem) => (
              <PurchaseItem key={purchase.id} {...purchase} />
            ))
          : times((idx) => <SkeletonPurchase key={idx} />, 10)}
      </div>
    </div>
  );
};

export default PurchasesPage;
