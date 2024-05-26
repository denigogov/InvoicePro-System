const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/auth");

const { selectAllUsers } = require("../database/users");
router.get("/", selectAllUsers);

module.exports = router;
