const express = require("express");
const connectDB = require("./db/database");

const eventRouter = require("./apis/events/routes");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/apis/events", eventRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is listening", PORT);
  connectDB();
});
