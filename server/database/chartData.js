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

const invoiceTotalProMonth = async (_, res) => {
  try {
    const [query] = await database.query(`
    SELECT 
    DATE_FORMAT(date, '%b') as InvoiceMonth,
    SUM(totalPrice) as TotalSales
    FROM 
    invoice
    GROUP BY 
    YEAR(date), MONTH(date), DATE_FORMAT(date, '%b')
    ORDER BY 
    YEAR(date), MONTH(date)
`);

    query.length ? res.status(200).send(query) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

module.exports = {
  invoiceCountByStatus,
  invoiceTotalProMonth,
};
