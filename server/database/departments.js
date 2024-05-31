const database = require("./database");

const selectAllDepartments = async (req, res) => {
  try {
    const [allDepartments] = await database.query(`
      SELECT * from department`);

    allDepartments.length
      ? res.status(200).send(allDepartments)
      : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

module.exports = {
  selectAllDepartments,
};
