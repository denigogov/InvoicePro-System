const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");
const {
  createInvoice,
  lastInvoiceId,
  createInvoiceDetails,
  allInvoicesPagination,
  deleteInvoice,
  updateInvoice,
} = require("../database/invoiceDB");
const {
  validateInvoiceCreate,
  validateCreateInvoiceDetails,
  validateUpdateInvoice,
} = require("../validation/invoiceValidation");

router
  .get("/", allInvoicesPagination)
  .post("/", validateInvoiceCreate, createInvoice)
  .delete("/:id", deleteInvoice)
  .put("/:id", validateUpdateInvoice, updateInvoice)
  .get("/lastId", lastInvoiceId)
  .post("/details", validateCreateInvoiceDetails, createInvoiceDetails);

module.exports = router;
