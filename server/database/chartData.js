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

// Details in Invoice Route - route  name invoice
const recentInvoices = async (_, res) => {
  try {
    const [fetchData] = await database.query(`
        select invoiceId, customerName, date, totalPrice, statusName,statusId from invoice 
        left join invoicestatus on invoicestatus.id = invoice.statusId
        left join customercompany on customercompany.id = invoice.customercompanyId
        ORDER BY invoice.id desc limit 3`);

    fetchData.length ? res.status(200).send(fetchData) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

const reportData = async (req, res) => {
  const { totalInvoices, averageInvoice, totalDiscount } = req.body;

  const updateValues = {};

  if (totalInvoices !== undefined) {
    const [totalInvoice] = await database.query(
      "select statusName ,count(invoice.id) as total_invoice_byStatus from invoice left join invoicestatus on invoicestatus.id = invoice.statusId GROUP BY statusName order by total_invoice_byStatus DESC"
    );
    updateValues.totalInvoice = totalInvoice;
  }

  if (averageInvoice !== undefined) {
    const [averageInvoice] = await database.query(
      `SELECT 
    SUM(discount) AS total_discount, 
    COUNT(DISTINCT customercompany.id) AS total_customers,
    Round(avg(totalPrice),2) as avarage_invoicePrice 
FROM 
    invoice
LEFT JOIN 
    customercompany 
ON 
    invoice.customercompanyId = customercompany.id;`
    );
    updateValues.averageInvoice = averageInvoice;
  }

  if (totalDiscount !== undefined) {
    const [totalDiscount] = await database.query(
      `SELECT tax, round(SUM(totalPrice * tax / 100 - discount),2) AS total_tax_sum,
        count(id) as total_invoices
        FROM invoice
        GROUP BY tax
        order by tax 
`
    );
    updateValues.TotalTax = totalDiscount;
  }

  updateValues ? res.status(200).send(updateValues) : res.sendStatus(400);
};
module.exports = {
  invoiceCountByStatus,
  invoiceTotalProMonth,
  recentInvoices,
  reportData,
};
