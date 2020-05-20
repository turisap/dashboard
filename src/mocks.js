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

const getRandomCategory = () => {
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

export const fakeExpenses = (n: number) => {
  return times((id: number) => {
    const [category, type] = getRandomCategory();

    return {
      id,
      description: faker.lorem.sentence(),
      category,
      type,
      total: faker.random.number()
    };
  }, n);
};
