import faker from "faker";
import { times } from "ramda";

export const fakeNotifications = (n: number) =>
  times(
    (id: number) => ({
      id,
      text: faker.lorem.sentence()
    }),
    n
  );

const getRandomExpenseCategory = () => {
  const categories = {
    housing: ["bills", "homeware", "pets"],
    food: ["food"],
    leisure: ["eating out", "nights out", "shopping", "travel"],
    health: ["checkups", "medicines"]
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
  description: faker.lorem.sentence()
});

export const fakeExpenses = (n: number) => {
  return times((id: number) => {
    const [category, type] = getRandomExpenseCategory();

    return {
      id,
      category,
      type,
      ...commonFields()
    };
  }, n);
};

export const fakeIncomings = (n: number) => {
  return times((id: number) => {
    const category = getRandomIncomeCategory();
    const saved = faker.finance.amount();
    const total = (saved * (Math.random() + 1)).toFixed(2);
    return {
      ...commonFields(),
      category,
      id,
      saved,
      total
    };
  }, n);
};
