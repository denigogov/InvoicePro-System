require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const { encrypt } = require("./encript");
const { handleTryCatch } = require("../utility/tryCatch");
const { CustomError } = require("../utility/customError");

sgMail.setApiKey(process.env.APIEMAILKEY);

const hashOption = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// if I make admin to create user!
const hashedPassword = handleTryCatch(async (req, res, next) => {
  if (req.body.password) {
    const hashpass = await argon2.hash(req.body.password, hashOption);
    req.body.password = hashpass;
  }

  next();
});

const verifyPassword = handleTryCatch(async (req, res) => {
  const verifyPass = await argon2.verify(req.user.password, req.body.password);

  // creating the confirm code
  let randomBytes = crypto.randomBytes(4).toString("hex");
  let encryptedCode = encrypt(randomBytes);

  if (verifyPass) {
    const payload = {
      sub: req.user.id,
      type: req.user.departmentId,
      code: encryptedCode,
    };

    const token = jwt.sign(payload, process.env.JWT_CODE, {
      expiresIn: "5m",
    });

    const message = {
      from: {
        email: process.env.EMAIL,
      },

      personalizations: [
        {
          to: [
            {
              email: req.user.email,
            },
          ],

          dynamic_template_data: {
            confirmCode: `${randomBytes}`,
          },
        },
      ],
      template_id: process.env.TEMPLATE_ID,
    };
    if (req.user.email !== "guest@nexigo.com") {
      await sgMail.send(message).then(() => res.status(200).send({ token }));
    } else {
      res.status(200).send({ token });
    }
  } else {
    throw CustomError.badRequestError("wrong password");
  }
});

const verifyToken = handleTryCatch(async (req, res, next) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader)
    throw CustomError.unauthorizedError("Authorization header is missing");

  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer") {
    // Invalid token type
    throw CustomError.unauthorizedError("Invalid token type");
  }
  jwt.verify(token, process.env.JWT_CODE, (err, decodedToken) => {
    if (err) {
      // Invalid token
      throw CustomError.unauthorizedError("Invalid token");
    }

    req.decodedToken = decodedToken;

    next();
  });
});

module.exports = {
  hashedPassword,
  verifyPassword,
  verifyToken,
};
