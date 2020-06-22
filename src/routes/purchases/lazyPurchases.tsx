import React, { useEffect, useRef, RefObject } from "react";
import { Skeleton } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { times } from "ramda";

import { fetchPurchases } from "ducks/purchases";
import { useLazyLQIP } from "hooks/";
import { REDUCERS, API, PurchaseItem, LoadingStatus } from "types/";

import styles from "./styles.scss";

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

const PurchaseCard: React.FC<API.Purchase> = React.forwardRef(
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

PurchaseCard.displayName = "PurchaseCard";

const PurchasesPage: React.FC = () => {
  const dispatch = useDispatch();
  const root = useRef<HTMLDivElement>(null);
  const purchases = useSelector<REDUCERS.RootState, API.PurchasesList>(
    getPurchasesListMemo
  );

  const pageStatus = useSelector<REDUCERS.RootState, LoadingStatus>(
    getPageStatus
  );

  const items = useLazyLQIP<HTMLImageElement>(purchases, root, 1);

  useEffect(() => {
    if (pageStatus === "pristine") {
      dispatch(fetchPurchases.request());
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner} ref={root}>
        {items.length
          ? items.map((purchase: PurchaseItem) => (
              <PurchaseCard key={purchase.id} {...purchase} />
            ))
          : times((idx) => <SkeletonPurchase key={idx} />, 10)}
      </div>
    </div>
  );
};

export default PurchasesPage;
