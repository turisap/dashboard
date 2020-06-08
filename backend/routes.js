const mocks = require("./mocks.js");

const repsonseWithTimeout = (res, status = 200, data = {}, delay = 1000) =>
  setTimeout(() => res.status(status).json(data), delay);

const randomBool = () => Math.random() > 0.5;

// expensese and incomings
// TODO remove delays
const appRouter = function(app) {
  app.get("/expenses", function(req, res) {
    const data = mocks.fakeExpenses(500);
    setTimeout(() => res.status(200).json(data), 1000);
  });

  app.get("/incomings", function(req, res) {
    const data = mocks.fakeIncomings(500);
    setTimeout(() => res.status(200).json(data), 1000);
  });

  app.post(
    ["/lists/starred", "/lists/flagged", "/lists/synced", "/lists/marked"],
    function(req, res) {
      if (Math.random() > 0.99) {
        repsonseWithTimeout(res, 200, "success", 100);
      } else {
        repsonseWithTimeout(res, 418, "no way", 100);
      }
    }
  );

  app.get("/graph_data", function(req, res) {
    const data = mocks.fakeGraphData();
    repsonseWithTimeout(res, 200, data, 1000);
  });
};

module.exports = appRouter;
