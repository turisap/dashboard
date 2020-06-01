const mocks = require("./mocks.js");

// expensese and incomings
const appRouter = function(app) {
  app.get("/expenses", function(req, res) {
    const data = mocks.fakeExpenses(500);
    setTimeout(() => res.status(200).json(data), 2500);
  });

  app.get("/incomings", function(req, res) {
    const data = mocks.fakeIncomings(500);
    setTimeout(() => res.status(200).json(data), 3500);
  });

  app.get("/test", function(req, res) {
    const data = mocks.fakeIncomings(500);
    res.status(200).json(data);
  });

  app.post("/test", function(req, res) {
    res.status(200).json("success");
  });
};

module.exports = appRouter;
