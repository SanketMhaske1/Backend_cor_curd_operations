const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const customersRouter = require("./router/router");
const dbConnection = require("./config/DBconnection");

const app = express();
const Port = process.env.PORT || 3002;
app.use(bodyParser.json());
app.use(cors());

app.use("/api", customersRouter);

app.listen(Port, () => {
  console.log(`Server started on port ${Port}`);
});
