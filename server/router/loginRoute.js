const express = require("express");
const rateLimit = require("express-rate-limit");

const cron = require("node-cron");

const router = express.Router();
const { verifyPassword, verifyToken } = require("../auth/auth");
const {
  findUserData,
  confirmCode,
  validateUser,
  sendUserInfo,
  resendCode,
} = require("../database/login");

const {
  validateUserLogin,
  validateConfirmCode,
} = require("../validation/loginValidation");

const { resendCodeLimit } = require("../auth/rateLimit");

router
  .post("/", validateUserLogin, findUserData, verifyPassword)
  .post("/confirm", validateConfirmCode, verifyToken, confirmCode)
  .get("/", verifyToken, validateUser, sendUserInfo)
  .post("/resendcode", resendCodeLimit, verifyToken, resendCode);

// Simulate a login request because backend server goes to sleep after 15 minutes of inactivity and takes some time to wake up -- I'm using free version of render ! just for showcase(portfolio project)
//every 13 minutes!
cron.schedule("*/13 * * * *", async () => {
  try {
    const res = await fetch(process.env.BACKENDURLFORDCRONJOB, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "guest@nexigo.com",
        password: "guest123!",
      }),
    });
  } catch (error) {
    console.error("Error during scheduled login:", error.message);
  }
});

module.exports = router;
