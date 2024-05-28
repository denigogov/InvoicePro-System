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

module.exports = {
  selectAllUsers,
};
