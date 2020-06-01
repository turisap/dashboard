import * as t from "io-ts";

const CommonRowFields = t.type({
  id: t.number,
  description: t.string,
  category: t.string,
  total: t.number,
  starred: t.boolean,
  flagged: t.boolean,
});

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

type CommonRowFields = t.TypeOf<typeof CommonRowFields>;

type Incoming = t.TypeOf<typeof Incoming>;

type Expense = t.TypeOf<typeof Expense>;

type ExpensesList = t.TypeOf<typeof ExpensesList>;

type IncomingsList = t.TypeOf<typeof IncomingsList>;

export { CommonRowFields, Incoming, Expense, ExpensesList, IncomingsList };
