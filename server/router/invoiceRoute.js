const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");
const {
  createInvoice,
  lastInvoiceId,
  createInvoiceDetails,
} = require("../database/invoiceDB");
const {
  validateInvoiceCreate,
  validateCreateInvoiceDetails,
} = require("../validation/invoiceValidation");

router
  .get("/lastId", lastInvoiceId)
  .post("/", validateInvoiceCreate, createInvoice)
  .post("/details", validateCreateInvoiceDetails, createInvoiceDetails);

module.exports = router;
