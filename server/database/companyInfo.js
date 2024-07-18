const { CustomError } = require("../utility/customError");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const database = require("./database");

const companyData = handleTryCatch(async (_, res) => {
  const [company] = await database.query("select * from companyinfo");

  handleResponse(
    company,
    () => res.status(200).send(company),
    () => {
      throw CustomError.notFoundError("No Company Found");
    }
  );
});

const companyDetailsUpdate = handleTryCatch(async (req, res) => {
  const { id } = req.params;

  const {
    companyName,
    country,
    city,
    street,
    zipcode,
    idNumber,
    bankName,
    iban,
    bic,
  } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (companyName !== undefined) {
    updateFields.push("companyName = ?");
    updateValues.push(companyName);
  }
  if (country !== undefined) {
    updateFields.push("country = ?");
    updateValues.push(country);
  }
  if (city !== undefined) {
    updateFields.push("city = ?");
    updateValues.push(city);
  }
  if (street !== undefined) {
    updateFields.push("street = ?");
    updateValues.push(street);
  }
  if (zipcode !== undefined) {
    updateFields.push("zipcode = ?");
    updateValues.push(zipcode);
  }

  if (idNumber !== undefined) {
    updateFields.push("idNumber = ?");
    updateValues.push(idNumber);
  }
  if (bankName !== undefined) {
    updateFields.push("bankName = ?");
    updateValues.push(bankName);
  }
  if (iban !== undefined) {
    updateFields.push("iban = ?");
    updateValues.push(iban);
  }
  if (bic !== undefined) {
    updateFields.push("bic = ?");
    updateValues.push(bic);
  }

  const updateCompanyDetails = `UPDATE companyinfo SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;

  const [updateTable] = await database.query(updateCompanyDetails, [
    ...updateValues,
    id,
  ]);

  handleResponse(
    updateTable,
    () =>
      res.status(200).send({ message: "Company data updated successfully" }),
    () => {
      throw CustomError.badRequestError("Update failed. No rows affected");
    }
  );
});

module.exports = {
  companyData,
  companyDetailsUpdate,
};
