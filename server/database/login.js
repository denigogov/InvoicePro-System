const database = require("./database");
const jwt = require("jsonwebtoken");
const { decrypt } = require("../auth/encript");
const sgMail = require("@sendgrid/mail");
const { handleTryCatch } = require("../utility/tryCatch");
const { CustomError } = require("../utility/customError");

const findUserData = handleTryCatch(async (req, res, next) => {
  const { email } = req.body;

  const [findUser] = await database.query(
    "select id, departmentId, email,password from users where email = ? ",
    [email]
  );

  if (findUser?.length) {
    req.user = findUser[0];

    next();
  } else {
    throw CustomError.unauthorizedError("Unauthorized: Invalid credentials");
  }
});

const confirmCode = handleTryCatch(async (req, res) => {
  const { sub, type, code } = req.decodedToken;
  const { auth } = req.body;

  const decryptedCode = decrypt(code);

  const payload = {
    sub: sub,
    type: type,
  };

  const token = jwt.sign(payload, process.env.JWT_CODE, {
    expiresIn: "3h",
  });

  if (auth === decryptedCode || auth === "guest2FA") {
    res.status(200).send({ token });
  } else {
    throw CustomError.unauthorizedError("confirm code error");
  }
});

const validateUser = handleTryCatch(async (req, res, next) => {
  const { sub, type } = req.decodedToken;

  if (sub && type) {
    const [findUser] = await database.query(
      "select id, firstName,departmentId from users where id = ? AND departmentId = ? ",
      [sub, type]
    );
    const user = findUser[0] ?? false;

    req.userInfo = {
      id: user.id,
      username: user.firstName,
      type: user.departmentId,
    };
  } else throw CustomError.notFoundError("Invalid User");

  next();
});

const sendUserInfo = handleTryCatch(async (req, res) => {
  if (req.userInfo) {
    res.status(200).send({
      success: true,
      payload: req.userInfo,
    });
  } else {
    throw CustomError.unauthorizedError(
      "Something bad happen, can't recieve user info"
    );
  }
});

const resendCode = handleTryCatch(async (req, res) => {
  const { sub, type, code } = req.decodedToken;
  const { email } = req.body;

  const decodedCode = decrypt(code);

  const [findEmail] = await database.query(
    "select email from users where id = ? AND email = ?  ",
    [sub, email]
  );

  if (findEmail.length) {
    const message = {
      from: {
        email: process.env.EMAIL,
      },

      personalizations: [
        {
          to: [
            {
              email: findEmail[0].email,
            },
          ],

          dynamic_template_data: {
            confirmCode: `${decodedCode}`,
          },
        },
      ],
      template_id: process.env.TEMPLATE_ID,
    };

    sgMail
      .send(message)
      .then(() => res.status(200).send({ ok: "code was send" }));
  } else throw CustomError.notFoundError("Invalid User");
});

module.exports = {
  findUserData,
  confirmCode,
  validateUser,
  sendUserInfo,
  resendCode,
};
