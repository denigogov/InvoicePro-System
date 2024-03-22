const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.disable("x-powered-by");

const port = process.env.SERVER_PORT || 4001;

const welcomeMessage = (_, res) => {
  res.send("Backend App Server v0.0.1");
};

app.use("/", welcomeMessage);

app.listen(port, (err) => {
  err
    ? "Something bad happen"
    : `Server is listening on http://localhost:${port}/`;
});

module.exports = { app };
