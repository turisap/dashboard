import * as t from "io-ts";

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

const ExpensesList = t.array(Expense);

const IncomingsList = t.array(Incoming);

type ButtonFields = t.TypeOf<typeof ButtonFields>;

type CommonRowFields = t.TypeOf<typeof CommonRowFields>;

type Incoming = t.TypeOf<typeof Incoming>;

type Expense = t.TypeOf<typeof Expense>;

type ExpensesList = t.TypeOf<typeof ExpensesList>;

type IncomingsList = t.TypeOf<typeof IncomingsList>;

export {
  ButtonFields,
  CommonRowFields,
  Incoming,
  Expense,
  ExpensesList,
  IncomingsList,
};
