const apicache = require("apicache");

const cache = apicache.middleware;
const cacheMid = cache("5 minutes");
module.exports = {
  cacheMid,
};

// app.use(cache("5 minutes"));
