type CommonRowFields = {
  id: number;
  description: string;
  category: string;
  total: number;
  starred: boolean;
  flagged: boolean;
};

interface Incoming extends CommonRowFields {
  saved: string;
}

interface Expense extends CommonRowFields {
  type: string;
}

export { CommonRowFields, Incoming, Expense };
