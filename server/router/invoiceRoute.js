const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");
const { createInvoice } = require("../database/invoiceDB");

router.post("/", createInvoice);

module.exports = router;
