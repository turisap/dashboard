const faker = require("faker");
const times = require("ramda").times;
const urls = require("./data");

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
  expenses: shuffle([28, 56, 35, 105, 50, 70, 44, 70, 89, 110, 80, 65]),
  leisure: shuffle([35, 43, 3, 5, 7]),
  thisMonth: shuffle([28, 56, 35, 105, 50, 70, 44]),
  monthlyBills: shuffle([28, 40, 45, 65, 35]),
  lastWeek: shuffle([2, 5, 10, 7, 5, 8, 3]),
  overbudget: shuffle([1, 0, 2, 4, 5, 0, 7]),
});

const getRandomImage = (urls, id) => {
  return urls[id % urls.length];
};

const fakeGoods = (n) =>
  times((id) => {
    const { image, lquip } = getRandomImage(urls, id);

    return {
      id,
      title: faker.random.word(),
      description: faker.lorem.sentence(),
      image,
      lquip,
    };
  }, n);

module.exports = {
  fakeIncomings,
  fakeExpenses,
  fakeNotification,
  fakeGraphData,
  fakeGoods,
};
