const database = require("./database");
const jwt = require("jsonwebtoken");
const { decrypt, encrypt } = require("../auth/encript");
const sgMail = require("@sendgrid/mail");

const selectAllUsers = async (req, res) => {
  try {
    const [fetchAllUsers] = await database.query(`
      SELECT users.id as userId, firstName, lastName, email, departmentId, name as departmentName 
      FROM users
      left join department on department.id = users.departmentId`);

    fetchAllUsers.length
      ? res.status(200).send(fetchAllUsers)
      : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

const updateUser = async (req, res) => {
  try {
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

    updateTable.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, departmentId } = req.body;

    const [createEmployer] = await database.query(
      "INSERT INTO users (firstName, lastName, email, password, departmentId ) VALUES (?,?,?,?,?)",
      [firstName, lastName, email, password, departmentId]
    );

    createEmployer.affectedRows ? res.sendStatus(201) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const [deleteUser] = await database.query(
      "delete from users where id = ?",
      [id]
    );

    deleteUser.affectedRows ? res.sendStatus(200) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const passwordReset = async (req, res) => {
  try {
    const source = req.headers["user-agent"];
    console.log("aget", source);

    const { email } = req.body;

    const [findUser] = await database.query(
      `select id,email, lastName from users where email = ?`,
      [email]
    );

    if (email.length && findUser?.[0]?.email === email) {
      const payload = {
        type: encrypt(toString(findUser[0].id) + findUser[0].lastName),
      };

      const token = jwt.sign(payload, process.env.JWT_CODE, {
        expiresIn: "30sec",
      });

      const message = {
        from: {
          email: process.env.EMAIL,
        },

        personalizations: [
          {
            to: [
              {
                email: findUser?.[0].email,
              },
            ],

            dynamic_template_data: {
              tokenLink: `${process.env.FRONTEND__URL}/login/password-reset/confirm/${token}`,
            },
          },
        ],
        template_id: `${process.env.TEMPLATE_RESETPASSWORD}`,
      };

      sgMail.send(message).then(() => res.sendStatus(200));
    }
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

module.exports = {
  selectAllUsers,
  updateUser,
  createUser,
  deleteEmployee,
  passwordReset,
};
