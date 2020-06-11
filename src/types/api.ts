import * as t from "io-ts";

const GraphSeries = t.array(t.number);

const GraphData = t.type({
  expenses: GraphSeries,
  leisure: GraphSeries,
  thisMonth: GraphSeries,
  monthlyBills: GraphSeries,
  lastWeek: GraphSeries,
  overbudget: GraphSeries,
});

const ButtonFields = t.type({
  starred: t.boolean,
  flagged: t.boolean,
  marked: t.boolean,
  synced: t.boolean,
});

const CommonRowFields = t.intersection([
  ButtonFields,
  t.type({
    id: t.number,
    description: t.string,
    category: t.string,
    total: t.number,
  }),
]);

const Incoming = t.intersection([
  CommonRowFields,
  t.type({
    saved: t.string,
  }),
]);

const Expense = t.intersection([
  CommonRowFields,
  t.type({
    type: t.string,
  }),
]);

const Purchase = t.type({
  id: t.number,
  title: t.string,
  description: t.string,
  image: t.string,
});

const PurchasesList = t.array(Purchase);

const ExpensesList = t.array(Expense);

const IncomingsList = t.array(Incoming);

// types
type ButtonFields = t.TypeOf<typeof ButtonFields>;

type CommonRowFields = t.TypeOf<typeof CommonRowFields>;

type Incoming = t.TypeOf<typeof Incoming>;

type Expense = t.TypeOf<typeof Expense>;

type ExpensesList = t.TypeOf<typeof ExpensesList>;

type IncomingsList = t.TypeOf<typeof IncomingsList>;

type GraphData = t.TypeOf<typeof GraphData>;

type GraphSeries = t.TypeOf<typeof GraphSeries>;

type Purchase = t.TypeOf<typeof Purchase>;

type PurchasesList = t.TypeOf<typeof PurchasesList>;

export {
  ButtonFields,
  CommonRowFields,
  Incoming,
  Expense,
  ExpensesList,
  IncomingsList,
  GraphData,
  GraphSeries,
  Purchase,
  PurchasesList,
};
