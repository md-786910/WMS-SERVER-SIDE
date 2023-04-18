const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const app = express();

// config dotenv
dotenv.config({});
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

// Routes
app.use(taskRoute);
app.use(companyRoute);
app.use(issuesRoute);
app.use(expenceRoute);
app.use(videoRoute);

app.get("/", (req, res) => {
    res.send("server working fine");
});

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
const runDb = async () => {
    try {
        const DB =
            process.env.NODE_ENV === "production"
                ? process.env.DB_URI
                : process.env.DB_URI_LOCAL;

        mongoose.set("strictQuery", false);
        await mongoose.connect(DB, { useUnifiedTopology: false });
        console.log("connected to MongoDB");

        app.listen(port, async () => {
            console.log("app is running on port " + port);
        });
    } catch (error) {
        console.log("connection error" + error.message);
    }
};
runDb();
