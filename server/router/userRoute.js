const express = require("express");
const router = express.Router();
const { verifyToken, hashedPassword } = require("../auth/auth");

const {
  validateUserUpdate,
  validateUserCreate,
  validateParam,
  validatePassRequest,
} = require("../validation/userValidation");
const {
  selectAllUsers,
  updateUser,
  createUser,
  deleteEmployee,
  passwordReset,
} = require("../database/users");

// Route name = User

router
  .get("/", selectAllUsers)
  .post("/", validateUserCreate, hashedPassword, createUser)
  .put("/:id", validateUserUpdate, hashedPassword, updateUser)
  .delete("/:id", validateParam, deleteEmployee)
  .post("/pass-reset", validatePassRequest, passwordReset);

module.exports = router;
