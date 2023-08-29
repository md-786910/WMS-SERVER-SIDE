const apicache = require("apicache");
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cache = apicache.middleware;
const cacheMid = cache("2 minutes", onlyStatus200);
module.exports = {
  cacheMid,
};

// app.use(cache("5 minutes"));
