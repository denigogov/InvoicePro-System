const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");

const { allInvoiceSettings } = require("../database/InvoiceSettings");

router.get("/", allInvoiceSettings);

module.exports = router;
