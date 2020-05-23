type VirtualRowProps<T> = {
  index: number;
  style: React.CSSProperties;
  data: T[];
};

type CommonRowFields = {
  id: number;
  description: string;
  category: string;
  total: number;
  starred: boolean;
};

interface Incoming extends CommonRowFields {
  saved: string;
}

interface Expense extends CommonRowFields {
  type: string;
}

type RowInfo = Expense | Incoming;

type LoadingStatus = "loading" | "success" | "fail" | "idle";

type IconsContainerProps = {
  status: LoadingStatus;
  id: number;
};

// custom type guard
function isExpense(row: Expense | Incoming): row is Expense {
  return typeof (row as Expense).type !== "undefined";
}

export {
  VirtualRowProps,
  Incoming,
  Expense,
  RowInfo,
  LoadingStatus,
  IconsContainerProps,
  isExpense,
};
