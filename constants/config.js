require("dotenv").config({})
const config = Object.freeze({
    DB_URI: process.env.DB_URI || "mongodb://localhost:27017/wms",
    region: process.env.REGION,
    bucket_name: process.env.BUCEKT_NAME,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})
module.exports = config;