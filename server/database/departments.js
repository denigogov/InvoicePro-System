const { CustomError } = require("../utility/customError");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const database = require("./database");

const selectAllDepartments = handleTryCatch(async (_, res) => {
  const [allDepartments] = await database.query(`
      SELECT * from department`);

  handleResponse(
    allDepartments,
    () => res.status(200).send(allDepartments),
    () => {
      throw CustomError.notFoundError("Departments Error, Not Found");
    }
  );
});

module.exports = {
  selectAllDepartments,
};
