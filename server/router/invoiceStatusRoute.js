const express = require("express");
const router = express.Router();

const { verifyToken } = require("../auth/auth");
const {
  invoiceStatus,
  allInvoiceStatus,
  updateInvoiceStatus,
} = require("../database/invoiceStatus");

const {
  validateUpdateInvoiceStatus,
} = require("../validation/invoiceStatusValidation");

const { invoiceCountByStatus } = require("../database/chartData");

// Route Name invoiceStatus
router
  .get("/chart", invoiceCountByStatus)
  .get("/", allInvoiceStatus)
  .get("/:id", invoiceStatus)
  .put("/:id", validateUpdateInvoiceStatus, updateInvoiceStatus);

module.exports = router;
