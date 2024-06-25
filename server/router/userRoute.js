const express = require("express");
const router = express.Router();
const { verifyToken, hashedPassword } = require("../auth/auth");

const {
  validateUserUpdate,
  validateUserCreate,
  validateParam,
  validatePassRequest,
  validatePasswordChange,
} = require("../validation/userValidation");
const {
  selectAllUsers,
  updateUser,
  createUser,
  deleteEmployee,
  passwordReset,
  allowUserResetEmail,
  changePassword,
} = require("../database/users");

const { resendCodeLimit } = require("../auth/rateLimit");

// Route name = User

router
  .get("/", verifyToken, selectAllUsers)
  .post("/", verifyToken, validateUserCreate, hashedPassword, createUser)
  .put("/:id", verifyToken, validateUserUpdate, hashedPassword, updateUser)
  .delete("/:id", verifyToken, validateParam, deleteEmployee)
  .post("/pass-reset", validatePassRequest, passwordReset)
  .post("/confirmRestToken", verifyToken, allowUserResetEmail)
  .post(
    "/password",
    resendCodeLimit,
    validatePasswordChange,
    verifyToken,
    hashedPassword,
    changePassword
  );

module.exports = router;
