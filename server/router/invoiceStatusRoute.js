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
  .get("/chart", verifyToken, invoiceCountByStatus)
  .get("/", verifyToken, allInvoiceStatus)
  .get("/:id", verifyToken, invoiceStatus)
  .put("/:id", validateUpdateInvoiceStatus, updateInvoiceStatus);

module.exports = router;
