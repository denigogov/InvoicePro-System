const database = require("./database");

const invoiceStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const [selectAllStatus] = await database.query(
      "select * from invoicestatus"
    );
    const [findPriceTaxDiscount] = await database.query(
      "select totalPrice,statusId,tax,discount from invoice where invoiceId = ? ",
      [id]
    );

    selectAllStatus.length || findPriceTaxDiscount.length
      ? res.status(200).send({ selectAllStatus, findPriceTaxDiscount })
      : res.sendstatus(404);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

module.exports = { invoiceStatus };
