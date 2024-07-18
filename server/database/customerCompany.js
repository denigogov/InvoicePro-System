const { CustomError } = require("../utility/customError");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const database = require("./database");

const allCustomers = handleTryCatch(async (req, res) => {
  const { id } = req.params;

  const [findcustomers] = await database.query(
    `select * from customercompany ${id ? "Where id = ?" : ""}`,
    [id]
  );

  handleResponse(
    findcustomers,
    () => res.status(200).send(findcustomers),
    () => {
      throw CustomError.notFoundError("Customers Not Found");
    }
  );
});

const createCustomerCompany = handleTryCatch(async (req, res) => {
  const { customerName, country, city, street, zipcode, idNumber } = req.body;

  const [createQuery] = await database.query(
    `insert into customercompany (customerName, country, city, street, zipcode ,idNumber) values(?,?,?,?,?,?)`,
    [customerName, country, city, street, zipcode, idNumber]
  );

  handleResponse(
    createQuery,
    () => res.status(200).send(createQuery),
    () => {
      throw CustomError.badRequestError("Creation failed. No rows affected");
    }
  );
});

const updateCustomerCompany = handleTryCatch(async (req, res) => {
  const { id } = req.params;
  const fields = [
    "customerName",
    "country",
    "city",
    "street",
    "zipcode",
    "idNumber",
  ];

  const updates = [];
  const updateValues = [];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      updateValues.push(req.body[field]);
    }
  });

  if (!updates.length)
    throw CustomError.badRequestError("Update failed. No rows affected");

  const query = `UPDATE customercompany SET ${updates.join(", ")} WHERE id = ?`;
  const [updateTable] = await database.query(query, [...updateValues, id]);

  handleResponse(
    updateTable,
    () => res.status(200).send(updateTable),
    () => {
      throw CustomError.badRequestError("Update failed. No rows affected");
    }
  );
});

module.exports = {
  allCustomers,
  createCustomerCompany,
  updateCustomerCompany,
};
