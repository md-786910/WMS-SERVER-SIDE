const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 180 }); // 180 seconds = 3 minutes

const generateCacheKey = (req) => {
  console.log("Generating cache key", req.url, req.originalUrl);
  return req.originalUrl || req.url;
};

// Cache middleware
// const cacheMid = () => {
//   return (req, res, next) => {
//     const key = generateCacheKey(req);
//     const cachedResponse = cache.get(key);
//     if (cachedResponse) {
//       res.send(cachedResponse);
//     } else {
//       res.on('finish', () => {
//         console.log({ key, resp: res })
//         cache.set(key, res.responseText);
//       });
//       next();
//     }
//   };
// };

const cacheMid = () => {
  return (req, res, next) => {
    const key = generateCacheKey(req);
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
      res.send(cachedResponse);
    } else {
      const originalSend = res.send;
      res.send = (body) => {
        cache.set(key, body);
        originalSend.call(res, body);
      };
      next();
    }
  };
};


// Clear cache on POST, PATCH, and DELETE requests
const clearCacheOnMethod = (req, res, next) => {
  console.log(req.method)
  if (req.method === "POST" || req.method === "PATCH" || req.method === "DELETE") {
    cache.del(req.url || req.originalUrl);
  }
  next();
};

// Function to clear cache by key
const clearCacheByKey = () => {
  console.log("Clearing cache");
  return (req, res, next) => {
    if (req.url) {
      cache.del(req.url || req.originalUrl);
    }
    next();
  };
};

module.exports = {
  cacheMid,
  clearCacheOnMethod,
  clearCacheByKey,
};