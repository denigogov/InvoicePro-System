const { CustomError } = require("../utility/customError");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const database = require("./database");
require("dotenv").config();

const lastInvoiceId = handleTryCatch(async (_, res) => {
  const [lastId] = await database.query(
    `SELECT id as lastId FROM ${process.env.DB_NAME}.invoice ORDER BY id DESC LIMIT 1`
  );

  lastId.length
    ? res.status(200).send(lastId)
    : res.status(200).send([
        {
          lastId: "0",
        },
      ]);
});

const createInvoice = handleTryCatch(async (req, res) => {
  const { date, companyInfoId, customercompanyId, createdById, tax, discount } =
    req.body;

  // WHEN I CREATE INVOICE I DON'T ADD THE INVOICE NUMBER I UPDATE THE TABLE IN STEP-4 AND ADD THEN -- BECAUSE WHEN I DELETE SOME INVOICE LATER WHEN CREATE NEW INVOICE I DON'T GET THE CORRECT INVOICE ID

  const [createInvoiceQuery] = await database.query(
    "insert into invoice (date,companyInfoId,customercompanyId,createdById, tax,discount ) values(?,?,?,?,?,?)",
    [date, companyInfoId, customercompanyId, createdById, tax, discount]
  );

  handleResponse(
    createInvoiceQuery,
    () => res.status(200).send(createInvoiceQuery),
    () => {
      throw CustomError.badRequestError("Failed to create invoice");
    }
  );
});

const updateInvoice = handleTryCatch(async (req, res) => {
  const { id } = req.params;
  const {
    invoiceId,
    date,
    companyInfoId,
    customercompanyId,
    totalPrice,
    statusId,
    tax,
    discount,
  } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (invoiceId !== undefined) {
    updateFields.push("invoiceId = ?");
    updateValues.push(invoiceId);
  }

  if (tax !== undefined) {
    updateFields.push("tax = ?");
    updateValues.push(tax);
  }

  if (discount !== undefined) {
    updateFields.push("discount = ?");
    updateValues.push(discount);
  }
  if (date !== undefined) {
    updateFields.push("date = ?");
    updateValues.push(date);
  }
  if (companyInfoId !== undefined) {
    updateFields.push("companyInfoId = ?");
    updateValues.push(companyInfoId);
  }
  if (customercompanyId !== undefined) {
    updateFields.push("customercompanyId = ?");
    updateValues.push(customercompanyId);
  }
  if (totalPrice !== undefined) {
    updateFields.push("totalPrice = ?");
    updateValues.push(totalPrice);
  }
  if (statusId !== undefined) {
    updateFields.push("statusId = ?");
    updateValues.push(statusId);
  }

  const updateInvoice = `UPDATE invoice SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;

  const [updateTable] = await database.query(updateInvoice, [
    ...updateValues,
    id,
  ]);

  handleResponse(
    updateTable,
    () => res.status(200).send(updateTable),
    () => {
      throw CustomError.badRequestError("Update failed. No rows affected");
    }
  );
});

const createInvoiceDetails = handleTryCatch(async (req, res) => {
  const invoiceDetails = req.body;

  if (!Array.isArray(invoiceDetails) || invoiceDetails.length === 0) {
    return res.status(400).send("Invalid input format");
  }

  const values = invoiceDetails.map((invoiceDetail) => [
    invoiceDetail.invoiceID,
    invoiceDetail.description,
    invoiceDetail.price,
  ]);

  const query =
    "INSERT INTO invoicedetail (invoiceID, description, price) VALUES ?";

  const [createDetails] = await database.query(query, [values]);

  handleResponse(
    createDetails,
    () => res.status(200).send(createDetails),
    () => {
      throw CustomError.badRequestError("Failed to create invoice details");
    }
  );
});

// invoice pagination data together with filter  !
const allInvoicesPagination = handleTryCatch(async (req, res) => {
  const { page, limit } = req.query;
  const {
    searchInvoice,
    minPrice,
    maxPrice,
    createdDate,
    statusId,
    field,
    direction,
  } = req.body;

  const whereQuery = [];
  const requestValue = [];
  const orderByQuery = [];

  if (
    searchInvoice !== undefined &&
    searchInvoice !== null &&
    searchInvoice !== ""
  ) {
    whereQuery.push(
      `(LOWER(customerName) LIKE LOWER(CONCAT('%', ?, '%')) OR LOWER(invoiceId) LIKE LOWER(CONCAT('%', ?, '%')))`
    );
    requestValue.push(searchInvoice, searchInvoice);
  }

  if (statusId !== undefined && statusId !== null && statusId !== "") {
    whereQuery.push("invoice.statusId = ?");
    requestValue.push(+statusId);
  }

  if (
    minPrice !== undefined &&
    maxPrice === undefined &&
    minPrice !== null &&
    minPrice !== ""
  ) {
    whereQuery.push("totalPrice >= ?");
    requestValue.push(minPrice);
  }

  if (
    maxPrice !== undefined &&
    minPrice === undefined &&
    maxPrice !== null &&
    maxPrice !== ""
  ) {
    whereQuery.push("totalPrice <= ?");
    requestValue.push(maxPrice);
  }

  if (
    minPrice !== undefined &&
    maxPrice !== undefined &&
    minPrice !== null &&
    maxPrice !== null &&
    minPrice !== "" &&
    maxPrice !== ""
  ) {
    whereQuery.push(`totalPrice between ? AND  ?`);
    requestValue.push(minPrice, maxPrice);
  }

  if (createdDate !== undefined && createdDate !== null && createdDate !== "") {
    whereQuery.push("DATE(currentDate) = ?");
    requestValue.push(createdDate);
  }

  // ORDER BY
  if (field === "totalPrice") {
    orderByQuery.push(` ${field} ${direction}`);
  }

  if (field === "currentDate") {
    orderByQuery.push(`${field} ${direction}`);
  }

  if (field === "customerName") {
    orderByQuery.push(`${field} ${direction}`);
  }

  const offset = (page - 1) * limit;

  const whereClause = `${whereQuery.join(" AND ")}`;
  const orderClause = `ORDER BY  ${orderByQuery.join(", ")} `;

  const queryString = `SELECT invoice.id, invoiceId, customerName, totalPrice, invoice.date, statusName, statusId FROM ${
    process.env.DB_NAME
  }.invoice
      left join invoicestatus on invoice.statusId = invoicestatus.id
      left join customercompany on invoice.customercompanyId = customercompany.id
      where invoiceId is not null  ${whereQuery.length ? "AND" : ""} 
      ${whereQuery.length ? whereClause : ""} 
      ${orderByQuery.length ? orderClause : ""}
      limit ? offset ?`;

  const queryParams = [...requestValue, +limit, +offset];

  const [limitResults] = await database.query(queryString, queryParams);

  const [totalPageData] = await database.query(
    `select count(*) as count from invoice where invoiceId is not null `
  );

  const totalPages = Math.ceil(+totalPageData[0]?.count / limit);

  const paginationData = {
    invoiceData: limitResults,
    pagination: {
      page: +page,
      limit: +limit,
      totalPages,
    },
  };

  handleResponse(
    // if limit result.lenght I'm checking !
    limitResults,
    () => res.status(200).send(paginationData),
    () => {
      throw CustomError.badRequestError(
        "Failed to load invoices, please try again!"
      );
    }
  );
});

const deleteInvoice = handleTryCatch(async (req, res) => {
  const { id } = req.params;

  const [deleteInvoice] = await database.query(
    "delete from invoice where invoiceId = ?",
    [id]
  );

  handleResponse(
    deleteInvoice,
    () => res.sendStatus(200),
    () => {
      throw CustomError.notFoundError(
        "Failed to delete invoice. Invoice not found"
      );
    }
  );
});

const selectInvoiceById = handleTryCatch(async (req, res) => {
  const { id } = req.params;

  const [findInvoice] = await database.query(
    `SELECT  invoiceId,currentDate,totalPrice ,statusName,customerName,country,city,street,zipcode,idNumber,tax,discount FROM ${process.env.DB_NAME}.invoice
    left join invoicestatus on invoice.statusId = invoicestatus.id
    left join customercompany on invoice.customercompanyId = customercompany.id
    where invoiceId = ? `,
    [id]
  );

  const [findDetails] = await database.query(
    `select invoicedetail.id, description,price from invoicedetail
      left join invoice on invoice.id = invoicedetail.invoiceID
      where invoice.invoiceId = ?
    `,
    [id]
  );

  handleResponse(
    findDetails || findInvoice,
    () => res.status(200).send({ findInvoice, findDetails }),
    () => {
      throw CustomError.notFoundError("Inovice Error, Not Found");
    }
  );
});

const updateInvoiceDetails = handleTryCatch(async (req, res) => {
  const { id } = req.params;
  const { description, price, totalPrice, invoiceId } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (description !== undefined) {
    updateFields.push("description = ?");
    updateValues.push(description);
  }

  if (price !== undefined) {
    updateFields.push("price = ?");
    updateValues.push(price);
  }

  const invoiceDetails = `UPDATE invoicedetail SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;

  if (price !== undefined) {
    await database.query(
      "UPDATE invoice SET totalPrice = ? WHERE invoiceId = ?",
      [totalPrice, invoiceId]
    );
  }

  const [updateTable] = await database.query(invoiceDetails, [
    ...updateValues,
    id,
  ]);

  handleResponse(
    updateTable,
    () => res.sendStatus(200),
    () => {
      throw CustomError.badRequestError("Update failed. No rows affected");
    }
  );
});

module.exports = {
  createInvoice,
  lastInvoiceId,
  createInvoiceDetails,
  allInvoicesPagination,
  deleteInvoice,
  updateInvoice,
  selectInvoiceById,
  updateInvoiceDetails,
};
