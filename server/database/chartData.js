const { CustomError } = require("../utility/customError");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const database = require("./database");

const invoiceCountByStatus = handleTryCatch(async (_, res) => {
  const [queryStatus] = await database.query(
    `
      Select statusId, statusName, sum(totalPrice) as totalPrice, count(invoiceId) as totalInvoices from invoice 
      left join invoicestatus on invoice.statusId = invoicestatus.id
      where statusId is not null 
      group by statusId`
  );

  handleResponse(
    queryStatus,
    () => res.status(200).send(queryStatus),
    () => {
      throw CustomError.notFoundError("No invoice statuses found");
    }
  );
});

const invoiceTotalProMonth = handleTryCatch(async (_, res) => {
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
  handleResponse(
    query,
    () => res.status(200).send(query),
    () => {
      throw CustomError.notFoundError("No invoice data found");
    }
  );
});

// Details in Invoice Route - route  name invoice
const recentInvoices = handleTryCatch(async (_, res) => {
  const [fetchData] = await database.query(`
        select invoiceId, customerName, date, totalPrice, statusName,statusId from invoice 
        left join invoicestatus on invoicestatus.id = invoice.statusId
        left join customercompany on customercompany.id = invoice.customercompanyId
        ORDER BY invoice.id desc limit 3`);

  handleResponse(
    fetchData,
    () => res.status(200).send(fetchData),
    () => {
      throw CustomError.notFoundError("No Recent Invoices Found");
    }
  );
});

module.exports = {
  invoiceCountByStatus,
  invoiceTotalProMonth,
  recentInvoices,
};
