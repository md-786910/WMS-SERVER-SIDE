const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// const port = process.env.PORT || 8000;
const app = express();
const port = process.env.PORT || 5000;
// config dotenv
dotenv.config({});
require("./conn/mongoConn");

const Task = require("./models/task");
// route file
const taskRoute = require("./routes/task");
const companyRoute = require("./routes/company");
const issuesRoute = require("./routes/issues");
const expenceRoute = require("./routes/expence");
const videoRoute = require("./routes/videoRoute");
const sendMesssage = require("./mailer/mail");

const corsOptions = {
  origin: "*", //included origin as true
  credentials: true, //included credentials as true
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
// let cache = apicache.middleware;

// app.use(cache("5 minutes"));

// Routes
app.use(taskRoute);
app.use(companyRoute);
app.use(issuesRoute);
app.use(expenceRoute);
app.use(videoRoute);

app.get("/api/test", (req, res) => {
  res.send("server working fine");
});

app.get("*", (req, res) => {
  res.send("route does not exist");
});
// for text to speech

// setInterval(async () => {
//     const subject = "Your task is pending please complete!";

//     const data = await Task.find({});
//     if (data.length>=1) {
//         const text = `<div>
//         Task link : ${"https://wms-nu.vercel.app"}
//         <h3>
//         ${data.length} Task is pending now please complete early.
//         </h3>
//         </div>`;
//         sendMesssage(subject, text);
//     }
// }, 1000 * 60 * 60 * 24);
// * 60 * 24

app.listen(port, async () => {
  console.log("app is running on port " + port);
});

module.exports = app;
