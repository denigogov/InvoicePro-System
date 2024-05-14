const express = require("express");
const router = express.Router();

const { verifyToken } = require("../auth/auth");
const {
  invoiceStatus,
  allInvoiceStatus,
} = require("../database/invoiceStatus");

router.get("/", allInvoiceStatus).get("/:id", invoiceStatus);

module.exports = router;
