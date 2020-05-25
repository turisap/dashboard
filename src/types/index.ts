import * as UTILS from "./utils";
import * as REDUCERS from "./reducers";
import * as API from "./api";

type VirtualRowProps<T> = {
  index: number;
  style: React.CSSProperties;
  data: T[];
};

interface CommonRowInnerProps extends API.CommonRowFields {
  openModal: (id: number) => () => void;
}

type ExpenseProps = API.Expense & CommonRowInnerProps;

type IncomingProps = API.Incoming & CommonRowInnerProps;

type RowInfoInner = IncomingProps | ExpenseProps;

type LoadingStatus = "loading" | "success" | "fail" | "idle";

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
  LoadingStatus,
  IconsContainerProps,
};
