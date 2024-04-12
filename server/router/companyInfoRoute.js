const express = require("express");
const router = express.Router();

const { verifyToken } = require("../auth/auth");
const {
  companyData,
  companyDetailsUpdate,
} = require("../database/companyInfo");
const {
  validateUpdateCompanyInfo,
} = require("../validation/companyInfoValidation");

// need to add verifyToken - I remove to be able to work without token inside of the app
router
  .get("/", companyData)
  .put("/:id", validateUpdateCompanyInfo, companyDetailsUpdate);

module.exports = router;
