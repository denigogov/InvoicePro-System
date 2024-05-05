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
  selectInvoiceById,
} = require("../database/invoiceDB");
const {
  validateInvoiceCreate,
  validateCreateInvoiceDetails,
  validateUpdateInvoice,
} = require("../validation/invoiceValidation");

router
  .get("/", allInvoicesPagination)
  .get("/lastId", lastInvoiceId)
  .get("/:id", selectInvoiceById)
  .post("/", validateInvoiceCreate, createInvoice)
  .post("/details", validateCreateInvoiceDetails, createInvoiceDetails)
  .put("/:id", validateUpdateInvoice, updateInvoice)
  .delete("/:id", deleteInvoice);

module.exports = router;
