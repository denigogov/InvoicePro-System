const database = require("./database");

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

module.exports = {
  selectAllUsers,
  updateUser,
  createUser,
};
