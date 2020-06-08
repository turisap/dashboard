const faker = require("faker");
const times = require("ramda").times;

const fakeNotifications = (n) =>
  times(
    (id) => ({
      id,
      text: faker.lorem.sentence(),
    }),
    n
  );

const getRandomExpenseCategory = () => {
  const categories = {
    housing: ["bills", "homeware", "pets"],
    food: ["food"],
    leisure: ["eating out", "nights out", "shopping", "travel"],
    health: ["checkups", "medicines"],
  };

  const sets = Object.keys(categories);
  const randomCategory = sets[Math.floor(Math.random() * sets.length)];
  const types = categories[randomCategory];
  const randomType = types[Math.floor(Math.random() * types.length)];

  return [randomCategory, randomType];
};

const getRandomIncomeCategory = () => {
  const categories = ["salary", "savings", "lottery", "gifts"];

  const idx = Math.floor(Math.random() * categories.length);

  return categories[idx];
};

const commonFields = () => ({
  total: faker.random.number(),
  starred: faker.random.boolean(),
  marked: faker.random.boolean(),
  synced: faker.random.boolean(),
  flagged: faker.random.boolean(),
  description: faker.lorem.paragraph(),
});

const fakeExpenses = (n) => {
  return times((id) => {
    const [category, type] = getRandomExpenseCategory();

    return {
      id,
      category,
      type,
      ...commonFields(),
    };
  }, n);
};

const fakeIncomings = (n) => {
  return times((id) => {
    const category = getRandomIncomeCategory();
    const saved = faker.finance.amount();
    const total = parseInt((saved * (Math.random() + 1)).toFixed(2));

    return {
      ...commonFields(),
      category,
      id,
      saved,
      total,
    };
  }, n);
};

const fakeNotification = () => ({
  text: faker.lorem.word(2),
  type: faker.random.boolean() ? "success" : "failure",
});

const fakeGraphData = () => ({
  expenses: [28, 56, 35, 105, 50, 70, 44, 70, 89, 110, 80, 65],
  leisure: [35, 43, 3, 5, 7],
  thisMonth: [28, 56, 35, 105, 50, 70, 44],
  monthlyBills: [28, 40, 45, 65, 35],
  lastWeek: [2, 5, 10, 7, 5, 8, 3],
  overbudget: [1, 0, 2, 4, 5, 0, 7],
});

module.exports = {
  fakeIncomings,
  fakeExpenses,
  fakeNotification,
  fakeGraphData,
};
