const database = require("./database");
const jwt = require("jsonwebtoken");
const { decrypt, encrypt } = require("../auth/encript");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const { CustomError } = require("../utility/customError");
const EmailService = require("../utility/emailSender");

const selectAllUsers = handleTryCatch(async (req, res) => {
  const [fetchAllUsers] = await database.query(`
      SELECT users.id as userId, firstName, lastName, email, departmentId, name as departmentName 
      FROM users
      left join department on department.id = users.departmentId`);

  handleResponse(
    fetchAllUsers,
    () => res.status(200).send(fetchAllUsers),
    () => {
      throw CustomError.notFoundError(
        "Error, Employees Not Found,Please Try Later"
      );
    }
  );
});

const updateUser = handleTryCatch(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, departmentId } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (firstName !== undefined) {
    updateFields.push("firstName = ?");
    updateValues.push(firstName);
  }

  if (lastName !== undefined) {
    updateFields.push("lastName = ?");
    updateValues.push(lastName);
  }

  if (email !== undefined) {
    updateFields.push("email = ?");
    updateValues.push(email);
  }
  if (password !== undefined) {
    updateFields.push("password = ?");
    updateValues.push(password);
  }
  if (departmentId !== undefined) {
    updateFields.push("departmentId = ?");
    updateValues.push(departmentId);
  }

  const updateInvoice = `UPDATE users SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;

  const [updateTable] = await database.query(updateInvoice, [
    ...updateValues,
    id,
  ]);

  handleResponse(
    updateTable,
    () => res.sendStatus(200),
    () => {
      throw CustomError.badRequestError("Update Faild, No Row Affected");
    }
  );
});

const createUser = handleTryCatch(async (req, res) => {
  const { firstName, lastName, email, password, departmentId } = req.body;

  const [createEmployer] = await database.query(
    "INSERT INTO users (firstName, lastName, email, password, departmentId ) VALUES (?,?,?,?,?)",
    [firstName, lastName, email, password, departmentId]
  );

  handleResponse(
    createEmployer,
    () => res.sendStatus(201),
    () => {
      throw CustomError.badRequestError(
        "Create Employee Faild, Error, Please Try Later"
      );
    }
  );
});

const deleteEmployee = handleTryCatch(async (req, res) => {
  const { id } = req.params;

  const [deleteUser] = await database.query("delete from users where id = ?", [
    id,
  ]);

  handleResponse(
    deleteUser,
    () => res.sendStatus(200),
    () => {
      throw CustomError.notFoundError(
        "Error, User was not deleted, please try later "
      );
    }
  );
});

const passwordReset = handleTryCatch(async (req, res) => {
  // const source = req.headers["user-agent"];
  // console.log("aget", source);

  const { email } = req.body;

  const [findUser] = await database.query(
    `select id,email, lastName from users where email = ?`,
    [email]
  );

  if (email.length && findUser?.[0]?.email === email) {
    const payload = {
      data1: encrypt(findUser?.[0].email),
      data2: encrypt(findUser?.[0].id.toString()),
      data3: encrypt(findUser?.[0].lastName),
    };

    const token = jwt.sign(payload, process.env.JWT_CODE, {
      expiresIn: "10min",
    });
    if (email.length) {
      await EmailService.sendTemplateEmail({
        templateId: 1,
        to: [{ email: findUser?.[0].email, name: findUser?.[0].lastName }],
        params: {
          tokenExpireTime: 10,
          resetPasswordLink: `${process.env.FRONTEND__URL}/login/password-reset/confirm/${token}`,
          subjectline: "Reset Your Nexigo Password",
          previewtext: "Action required for your account.",
        },
      }).then(() => res.sendStatus(200));
    }
    // email.length ? res.status(200).send(token) : res.sendStatus(400);
  }
});

const allowUserResetEmail = handleTryCatch(async (req, res) => {
  const { data1, data2, data3 } = req.decodedToken;

  const email = decrypt(data1);
  const id = decrypt(data2);
  const lastName = decrypt(data3);

  const [confirmUser] = await database.query(
    "select lastName FROM users where email=? AND id=? AND lastName =?  ",
    [email, id, lastName]
  );

  handleResponse(
    confirmUser,
    () => res.sendStatus(200),
    () => {
      throw CustomError.notFoundError(
        "Error, User was not found, please try later "
      );
    }
  );
});

const changePassword = handleTryCatch(async (req, res) => {
  const { data1, data2 } = req.decodedToken;
  const { password } = req.body;

  const email = decrypt(data1);
  const id = decrypt(data2);

  const [findUser] = await database.query(
    "UPDATE users set password = ?  where id = ? AND email = ?",
    [password, id, email]
  );

  handleResponse(
    findUser,
    () => res.sendStatus(200),
    () => {
      throw CustomError.forbiddenError(
        "ERROR, Please reload the app and try again"
      );
    }
  );
});

module.exports = {
  selectAllUsers,
  updateUser,
  createUser,
  deleteEmployee,
  passwordReset,
  allowUserResetEmail,
  changePassword,
};
