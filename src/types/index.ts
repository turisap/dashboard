import { RefObject } from "react";
import * as UTILS from "./utils";
import * as REDUCERS from "./reducers";
import * as API from "./api";

type VirtualRowProps<T> = {
  index: number;
  style: React.CSSProperties;
  data: T[];
};

type PurchaseItem = API.Purchase & {
  ref: RefObject<HTMLImageElement>;
};

interface CommonRowInnerProps extends API.CommonRowFields {
  openModal: (id: number) => () => void;
  loading: boolean;
}

type ExpenseProps = API.Expense & CommonRowInnerProps;

type IncomingProps = API.Incoming & CommonRowInnerProps;

type RowInfoInner = (IncomingProps | ExpenseProps) & CommonRowInnerProps;

type RowInfo = API.Incoming | API.Expense;

type LoadingStatus = "pristine" | "success" | "fail" | "loading" | "dirty";

type BasicLoadingStatus = "loading" | "idle";

type NotificationTypes = "success" | "failure";

type DocumentStatus = "visible" | "hidden";

type Notification = {
  id: number;
  in: boolean;
  time: number;
  type: NotificationTypes;
  text: string;
};

type Message = {
  id: number;
  text: string;
};

type IconsContainerProps = {
  status: LoadingStatus;
  id: number;
};

export {
  API,
  UTILS,
  REDUCERS,
  VirtualRowProps,
  IncomingProps,
  ExpenseProps,
  RowInfoInner,
  RowInfo,
  LoadingStatus,
  BasicLoadingStatus,
  IconsContainerProps,
  Notification,
  NotificationTypes,
  DocumentStatus,
  PurchaseItem,
  Message,
};
