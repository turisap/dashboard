import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
import { createSelector } from "reselect";

import { fetchPurchases } from "ducks/purchases";

import styles from "./styles.scss";
import { REDUCERS, LoadingStatus, API } from "types/*";

const PurchaseItem: React.FC<API.Purchase> = ({ image }) => (
  <div className={styles.purchaseWrapper}>
    <Image publicId={image} />
  </div>
);

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
        {purchases.map((purchase, idx) => (
          <PurchaseItem key={idx} {...purchase} />
        ))}
      </div>
    </div>
  );
};

export default PurchasesPage;
