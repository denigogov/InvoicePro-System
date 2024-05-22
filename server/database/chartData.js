const database = require("./database");

const invoiceCountByStatus = async (_, res) => {
  try {
    const [queryStatus] = await database.query(
      `
      Select statusId, statusName, sum(totalPrice) as totalPrice, count(invoiceId) as totalInvoices from invoice 
      left join invoicestatus on invoice.statusId = invoicestatus.id
      where statusId is not null 
      group by statusId`
    );

    queryStatus.length
      ? res.status(200).send(queryStatus)
      : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  invoiceCountByStatus,
};
