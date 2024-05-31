const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");

const { selectAllDepartments } = require("../database/departments");

router.get("/", selectAllDepartments);

module.exports = router;
