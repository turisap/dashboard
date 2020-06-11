import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
import { createSelector } from "reselect";

import { fetchPurchases } from "ducks/purchases";

import styles from "./styles.scss";
import { REDUCERS, LoadingStatus, API } from "types/*";

const PurchaseItem: React.FC<API.Purchase> = ({
  title,
  description,
  image,
}) => (
  <div className={styles.purchaseWrapper}>
    <Image publicId={image} className={styles.purchaseImage} />
    <div className={styles.title}>{title}</div>
    <div className={styles.description}>{description}</div>
  </div>
);

// TODO move all selectors to the respective folder
// TODO rename all reselect selectors to end with memo
// TODO check how selectors work
const getPageStatus = (state: REDUCERS.RootState) => state.purchases.pageStatus;
const getPurchaseList = (state: REDUCERS.RootState) =>
  state.purchases.purchases;

const getPurchasesListMemo = createSelector(getPurchaseList, (list) => list);

const PurchasesPage: React.FC = () => {
  const dispatch = useDispatch();
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        {purchases.map((purchase) => (
          <PurchaseItem key={purchase.id} {...purchase} />
        ))}
      </div>
    </div>
  );
};

export default PurchasesPage;
