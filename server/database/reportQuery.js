const { CustomError } = require("../utility/customError");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const database = require("./database");

// I need the current year for yearQuarter
const date = new Date();
const year = date.getFullYear();

function getQuarterDateRange(quarter) {
  switch (quarter) {
    case "q1":
      return [`${year}-01-01`, `${year}-03-31`];
    case "q2":
      return [`${year}-04-01`, `${year}-06-30`];
    case "q3":
      return [`${year}-07-01`, `${year}-09-30`];
    case "q4":
      return [`${year}-10-01`, `${year}-12-31`];
    default:
      throw new Error("Invalid quarter");
  }
}

const reportData = handleTryCatch(async (req, res) => {
  const { startDate, endDate, yearQuarter, checkedBox } = req.body;

  // totalInvoices;
  // averageInvoice;
  // totalDiscount;
  // totalTax;
  // totalCustomers;
  // invoicesByStatus;

  let actualStartDate = startDate;
  let actualEndDate = endDate;

  if (yearQuarter) {
    try {
      [actualStartDate, actualEndDate] = getQuarterDateRange(yearQuarter);
    } catch (error) {
      throw CustomError.badRequestError("Time Period Error, please try later ");
    }
  }

  const updateValues = {};

  let totalInvoiceFiled = [];
  let invoiceByStatus = [];

  if (checkedBox.totalCustomers) {
    totalInvoiceFiled.push(
      "COUNT(DISTINCT customercompany.id) AS total_customers"
    );
  }
  if (checkedBox.averageInvoice) {
    totalInvoiceFiled.push("ROUND(AVG(totalPrice), 2) AS average_invoicePrice");
  }
  if (checkedBox.totalInvoices) {
    totalInvoiceFiled.push("COUNT(invoiceId) AS total_invoice");
  }

  if (checkedBox.invoiceByStatus !== undefined) {
    const [invoiceByStatus] = await database.query(
      `select statusName , sum(totalPrice) as totalPrice ,count(invoice.id) as total_invoice_byStatus from invoice
        left join invoicestatus on invoicestatus.id = invoice.statusId
        WHERE invoiceId IS NOT NULL
        AND currentDate BETWEEN  ? AND ?
        GROUP BY statusName
        order by total_invoice_byStatus DESC   
       `,
      [actualStartDate, actualEndDate]
    );
    updateValues.InvoicesByStatus = invoiceByStatus;
  }

  if (
    checkedBox.totalInvoices ||
    checkedBox.averageInvoice ||
    checkedBox.totalCustomers
  ) {
    const [totalInvoices] = await database.query(
      `SELECT   ${totalInvoiceFiled.join(", ")}
        FROM invoice 
        LEFT JOIN customercompany 
        ON  invoice.customercompanyId = customercompany.id
        WHERE invoiceId IS NOT NULL
        AND currentDate BETWEEN ? AND ?`,
      [actualStartDate, actualEndDate]
    );
    updateValues.TotalInvoices = totalInvoices;
  }

  if (checkedBox.totalTax) {
    const [totalTax] = await database.query(
      `SELECT tax, round(SUM(totalPrice * tax / 100),2) AS total_tax_sum,
        count(id) as total_invoices
        FROM invoice
        WHERE invoiceId IS NOT NULL
        AND currentDate BETWEEN ? AND ?
        GROUP BY tax
        order by tax
        `,
      [actualStartDate, actualEndDate]
    );
    updateValues.TotalTax = totalTax;
  }

  if (checkedBox.totalDiscount) {
    const [totalDiscount] = await database.query(
      `SELECT discount,    
        ROUND(SUM(totalPrice * discount / 100), 2) AS total_discount_sum,
        count(id) as total_invoices
        FROM invoice
        WHERE invoiceId IS NOT NULL
        AND currentDate BETWEEN ? AND ?
        GROUP BY discount
        order by discount 
       `,
      [actualStartDate, actualEndDate]
    );
    updateValues.TotalDiscount = totalDiscount;
  }

  handleResponse(
    [updateValues],
    () => res.status(200).send(updateValues),
    () => {
      throw CustomError.notFoundError("PDF Data Error,  - Please try later");
    }
  );
});

module.exports = {
  reportData,
};
