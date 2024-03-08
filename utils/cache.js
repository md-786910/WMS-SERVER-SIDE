// const apicache = require("apicache");
// const onlyStatus200 = (req, res) => res.statusCode === 200;
// const cache = apicache.middleware;
// const cacheMid = cache("2 minutes", onlyStatus200);
// module.exports = {
//   cacheMid,
// };

// app.use(cache("5 minutes"));
const apicache = require("apicache");
const generateCacheKey = (req) => {
  console.log("Generating cache key", req.url, req.originalUrl);
  return req.originalUrl || req.url;
};
const onlyStatus200 = (req, res) => res.statusCode === 200;
const cache = apicache.middleware;
const cacheDuration = "2 minutes";
const cacheMid = cache(cacheDuration, generateCacheKey, onlyStatus200);

// Function to clear cache by key
const clearCacheByKey = (key) => {
  console.log("Clearing cache", key);
  return (req, res, next) => {
    if (key) {
      apicache.clear(key);
    }
    next();
  };
};

module.exports = {
  cacheMid,
  clearCacheByKey,
};
