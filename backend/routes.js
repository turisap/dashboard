const mocks = require("./mocks.js");

// expensese and incomings
const appRouter = function(app) {
  app.get("/expenses", function(req, res) {
    const data = mocks.fakeExpenses(500);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
  });

  app.get("/incomings", function(req, res) {
    const data = mocks.fakeIncomings(500);
    res.status(200).json(data);
  });

  app.get("/test", function(req, res) {
    const data = mocks.fakeIncomings(500);
    res.status(200).json(data);
  });

  app.post("/test", function(req, res) {
    res.status(200);
    res.send();
  });
};

module.exports = appRouter;
