const database = require("./database");

const allInvoiceSettings = async (_, res) => {
  try {
    const [fetchAllSettings] = await database.query(
      "SELECT * FROM invoicesettings"
    );

    fetchAllSettings.length
      ? res.status(200).send(fetchAllSettings)
      : res.sendstatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateInvoiceSettings = async (req, res) => {
  try {
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

    updateTable.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

module.exports = {
  allInvoiceSettings,
  updateInvoiceSettings,
};
