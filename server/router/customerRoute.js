const express = require("express");
const router = express.Router();

const { verifyToken } = require("../auth/auth");
const {
  validateCustomerCompany,
} = require("../validation/customerCompanyValidation");

const {
  allCustomers,
  createCustomerCompany,
} = require("../database/customerCompany");

router
  .get("/", allCustomers)
  .post("/", validateCustomerCompany, createCustomerCompany);

module.exports = router;
