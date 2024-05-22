const express = require("express");
const router = express.Router();

const { verifyToken } = require("../auth/auth");
const {
  invoiceStatus,
  allInvoiceStatus,
} = require("../database/invoiceStatus");

const { invoiceCountByStatus } = require("../database/chartData");

// Route Name invoiceStatus
router
  .get("/chart", invoiceCountByStatus)
  .get("/", allInvoiceStatus)
  .get("/:id", invoiceStatus);

module.exports = router;
