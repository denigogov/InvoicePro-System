const database = require("./database");

const companyData = async (_, res) => {
  try {
    const [company] = await database.query("select * from companyinfo");

    company.length
      ? res.status(200).send(company)
      : res.status(404).send("No company found");
  } catch (err) {
    res.status(500).send(err);
  }
};

const companyDetailsUpdate = async (req, res) => {
  try {
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
    if (zipcode !== zipcode) {
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

    updateTable.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  companyData,
  companyDetailsUpdate,
};
