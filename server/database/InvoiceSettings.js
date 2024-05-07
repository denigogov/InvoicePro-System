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

module.exports = {
  allInvoiceSettings,
};
