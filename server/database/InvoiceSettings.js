const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const { CustomError } = require("../utility/customError");
const database = require("./database");

const allInvoiceSettings = handleTryCatch(async (_, res) => {
  const [fetchAllSettings] = await database.query(
    "SELECT * FROM invoicesettings"
  );

  handleResponse(
    fetchAllSettings,
    () => res.status(200).send(fetchAllSettings),
    () => {
      throw CustomError.badRequestError(
        "Invoice Settings Failed to Load,  please try again"
      );
    }
  );
});

const updateInvoiceSettings = handleTryCatch(async (req, res) => {
  const { id } = req.params;
  const { tax, discount } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (tax !== undefined) {
    updateFields.push("tax = ?");
    updateValues.push(tax);
  }

  if (discount !== undefined) {
    updateFields.push("discount = ?");
    updateValues.push(discount);
  }

  const updateInvoiceSettings = `UPDATE invoicesettings SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;

  const [updateTable] = await database.query(updateInvoiceSettings, [
    ...updateValues,
    id,
  ]);

  handleResponse(
    updateTable,
    () => res.sendStatus(200),
    () => {
      throw CustomError.badRequestError("Update failed. No rows affected");
    }
  );
});

module.exports = {
  allInvoiceSettings,
  updateInvoiceSettings,
};
