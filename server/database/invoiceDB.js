const database = require("./database");

const createInvoice = async (req, res) => {
  try {
    const {
      invoiceId,
      date,
      companyInfoId,
      customercompanyId,
      createdById,
      description,
      price,
      totalPrice,
    } = req.body;

    const [createInvoiceQuery] = await database.query(
      "insert into invoice (invoiceId,date,companyInfoId,customercompanyId,createdById,description,price,totalPrice) values(?,?,?,?,?,?,?,?)",
      [
        invoiceId,
        date,
        companyInfoId,
        customercompanyId,
        createdById,
        description,
        price,
        totalPrice,
      ]
    );

    createInvoiceQuery.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    console.log(err);

    res.status(500).send(err);
  }
};

module.exports = { createInvoice };
