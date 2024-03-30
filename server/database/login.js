const database = require("./database");
const jwt = require("jsonwebtoken");
const { decrypt } = require("../auth/encript");
const sgMail = require("@sendgrid/mail");

const findUserData = async (req, res, next) => {
  try {
    const { email } = req.body;

    const [findUser] = await database.query(
      "select id, departmentId, email,password from users where email = ? ",
      [email]
    );

    if (findUser?.length) {
      req.user = findUser[0];

      next();
    } else {
      res.status(401).send("Unauthorized: Invalid credentials");
    }
  } catch (err) {
    res.status(500).send(`username not valid , ${err.message}`);
  }
};

const confirmCode = async (req, res) => {
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

  try {
    auth === decryptedCode
      ? res.status(200).send({ token })
      : res.status(401).send({ error: "confirm code error" });
  } catch (err) {
    res.status(500).send("Wrong Credential");
  }
};

const validateUser = async (req, res, next) => {
  const { sub, type } = req.decodedToken;
  try {
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
    } else res.status(404).send("Invalid User");

    next();
  } catch (err) {
    res.status(500).send("Invalid User");
  }
};

const sendUserInfo = async (req, res) => {
  try {
    req.userInfo
      ? res.send({
          success: true,
          payload: req.userInfo,
        })
      : res.sendstatus(401);
  } catch (err) {
    res.status(500).send("something bad happen", err.message);
  }
};

const resendCode = async (req, res) => {
  try {
    const { sub, type, code } = req.decodedToken;
    const { email } = req.body;

    const decodedCode = decrypt(code);

    const [findEmail] = await database.query(
      "select email from users where id = ? AND email = ?  ",
      [sub, email]
    );

    console.log("emial", req.decodedToken);

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
    } else {
      res.status(404).send("Invalid User");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(`Something Bad Happen, pleas try one more time or contact us`);
  }
};

module.exports = {
  findUserData,
  confirmCode,
  validateUser,
  sendUserInfo,
  resendCode,
};
