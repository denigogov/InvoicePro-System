const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");
const { createInvoice } = require("../database/invoiceDB");
const { validateInvoiceCreate } = require("../validation/invoiceValidation");

router.post("/", validateInvoiceCreate, createInvoice);

module.exports = router;
