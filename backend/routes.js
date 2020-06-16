const mocks = require("./mocks.js");

const repsonseWithTimeout = (res, status = 200, data = {}, delay = 1000) =>
  setTimeout(() => res.status(status).json(data), delay);

// expensese and incomings
// TODO remove delays
const appRouter = function(app) {
  app.get("/expenses", function(req, res) {
    const data = mocks.fakeExpenses(500);
    if (Math.random() > 0.7) {
      repsonseWithTimeout(res, 200, data);
    } else {
      repsonseWithTimeout(res, 418, null, 500);
    }
  });

  app.get("/incomings", function(req, res) {
    const data = mocks.fakeIncomings(500);
    if (Math.random() > 0.7) {
      repsonseWithTimeout(res, 200, data);
    } else {
      repsonseWithTimeout(res, 418, null, 500);
    }
  });

  app.post(
    ["/lists/starred", "/lists/flagged", "/lists/synced", "/lists/marked"],
    function(req, res) {
      if (Math.random() > 0.7) {
        repsonseWithTimeout(res, 200, "success", 100);
      } else {
        repsonseWithTimeout(res, 418, "no way", 100);
      }
    }
  );

  app.get("/graph_data", function(req, res) {
    const data = mocks.fakeGraphData();
    if (Math.random() > 0.9) {
      repsonseWithTimeout(res, 200, data, 0);
    } else {
      repsonseWithTimeout(res, 418, null, 500);
    }
  });

  app.get("/goods", function(req, res) {
    const data = mocks.fakeGoods(50);
    if (Math.random() > 0.7) {
      repsonseWithTimeout(res, 200, data, 100);
    } else {
      repsonseWithTimeout(res, 418, "no way", 100);
    }
  });
};

module.exports = appRouter;
