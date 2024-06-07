const database = require("./database");

const invoiceStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const [selectAllStatus] = await database.query(
      "select * from invoicestatus"
    );
    const [findPriceTaxDiscount] = await database.query(
      "select id, totalPrice,statusId,tax,discount from invoice where invoiceId = ? ",
      [id]
    );

    selectAllStatus.length || findPriceTaxDiscount.length
      ? res.status(200).send({ selectAllStatus, findPriceTaxDiscount })
      : res.sendstatus(404);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

const allInvoiceStatus = async (_, res) => {
  try {
    const [selectAllStatus] = await database.query(
      "select * from invoicestatus"
    );

    selectAllStatus.length
      ? res.status(200).send(selectAllStatus)
      : res.sendstatus(404);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

const updateInvoiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusName } = req.body;

    const [updateQuery] = await database.query(
      `UPDATE invoicestatus set statusName =? where id = ?`,
      [statusName, id]
    );

    updateQuery.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

module.exports = { invoiceStatus, allInvoiceStatus, updateInvoiceStatus };
