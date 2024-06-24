require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const { encrypt } = require("./encript");

sgMail.setApiKey(process.env.APIEMAILKEY);

const hashOption = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// if I make admin to create user!
const hashedPassword = async (req, res, next) => {
  try {
    if (req.body.password) {
      const hashpass = await argon2.hash(req.body.password, hashOption);
      req.body.password = hashpass;
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const verifyPassword = async (req, res) => {
  try {
    const verifyPass = await argon2.verify(
      req.user.password,
      req.body.password
    );

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

      sgMail.send(message).then(() => res.status(200).send({ token }));
    } else {
      res.status(401).send("wrong password");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader)
      throw new Error("Authorization header is missing");

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      // Invalid token type
      res.status(401).send({
        success: false,
        error: "Invalid token type",
      });
      return;
    }
    jwt.verify(token, process.env.JWT_CODE, (err, decodedToken) => {
      if (err) {
        // Invalid token
        res.status(401).send({
          success: false,
          error: "Invalid token",
        });
        return;
      }

      req.decodedToken = decodedToken;

      next();
    });
  } catch (err) {
    console.error(err.message);

    res.status(401).send({
      success: false,
      error: "Authentication failed",
      details: err.message,
    });
  }
};

module.exports = {
  hashedPassword,
  verifyPassword,
  verifyToken,
};
