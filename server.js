require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cors = require("cors");

// port
const PORT = process.env.PORT || 9000;

// directory imports
const successLogger = require("./middlewares/successLogger");
const errorLogger = require("./middlewares/errorLogger");
const corsOptions = require("./config/cors/corsOptions");
const connectDB = require("./config/db/dbConnection");
const root = require("./routes/root");
const createSubscriber = require("./routes/subscribers");

// connect to db
connectDB();

// custom middle
app.use(successLogger);

// third-party middle
app.use(cors(corsOptions));

// built-in middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// use routes
app.use("/", root);
app.use("/subscribers", createSubscriber);

// else, 404, default route
app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// custom middle
app.use(errorLogger);

// start server once db is connected
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});

// check connection error
mongoose.connection.on("error", (err) => {
  console.log(err);
});
