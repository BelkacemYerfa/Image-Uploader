const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/main");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
const Port = process.env.PORT || 5000;

const start = async () => {
  try {
    /*  connectDB(); */
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
