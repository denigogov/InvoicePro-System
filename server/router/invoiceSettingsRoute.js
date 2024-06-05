const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");

const {
  validateUpdateInvoiceSettings,
} = require("../validation/invoiceSettingsValidation");

const {
  allInvoiceSettings,
  updateInvoiceSettings,
} = require("../database/InvoiceSettings");

// Route name "settings"
router
  .get("/", allInvoiceSettings)
  .put("/:id", validateUpdateInvoiceSettings, updateInvoiceSettings);

module.exports = router;
