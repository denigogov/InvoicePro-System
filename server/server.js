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

const loginRoute = require("./router/loginRoute");
const companyInfoRoute = require("./router/companyInfoRoute");
const customerRoute = require("./router/customerRoute");
const invoiceRoute = require("./router/invoiceRoute");
const invoicesettings = require("./router/invoiceSettingsRoute");
const invoiceStatus = require("./router/invoiceStatusRoute");
const userRoute = require("./router/userRoute");
const departmentRoute = require("./router/departmentRoute");

app.use("/login", loginRoute);
app.use("/company-info", companyInfoRoute);
app.use("/customer", customerRoute);
app.use("/invoice", invoiceRoute);
app.use("/invoiceStatus", invoiceStatus);
app.use("/user", userRoute);
app.use("/department", departmentRoute);
app.use("/settings", invoicesettings);

const welcomeMessage = (_, res) => {
  res.send("Backend App Server v0.0.1");
};

app.use("*", (_, res) => {
  res.status(500).send({ status: 500, message: "Route Not Found" });
});

app.use("/", welcomeMessage);

app.listen(port, (err) => {
  err
    ? console.log("Something bad happen")
    : console.log(`Server is running on http://localhost:${port}/`);
});

module.exports = { app };
