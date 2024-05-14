const database = require("./database");
require("dotenv").config();

const lastInvoiceId = async (_, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const createInvoice = async (req, res) => {
  try {
    const {
      date,
      companyInfoId,
      customercompanyId,
      createdById,
      tax,
      discount,
    } = req.body;

    // WHEN I CREATE INVOICE I DON'T ADD THE INVOICE NUMBER I UPDATE THE TABLE IN STEP-4 AND ADD THEN -- BECAUSE WHEN I DELETE SOME INVOICE LATER WHEN CREATE NEW INVOICE I DON'T GET THE CORRECT INVOICE ID

    const [createInvoiceQuery] = await database.query(
      "insert into invoice (date,companyInfoId,customercompanyId,createdById, tax,discount ) values(?,?,?,?,?,?)",
      [date, companyInfoId, customercompanyId, createdById, tax, discount]
    );

    createInvoiceQuery.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateInvoice = async (req, res) => {
  try {
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

    updateTable.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createInvoiceDetails = async (req, res) => {
  try {
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

    createDetails.affectedRows ? res.sendStatus(201) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// const [totalPageData] = await database.query(
//   `select count(*) as count from invoice`
// );

// console.log("totalSIze", +totalPageData[0]?.count);

// const totalPages = Math.ceil(+totalPageData[0]?.count / limit);

// const paginationData = {
//   data: limitResults,
//   pagination: {
//     page: +page,
//     limit: +limit,
//     totalPages,
//   },
// };

const allInvoicesPagination = async (req, res) => {
  const { page, limit } = req.query;
  const { minPrice, maxPrice, createdDate, statusId } = req.body;

  const whereQuery = [];
  const requestValue = [];

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
    whereQuery.push(`totalPrice between ? and ?`);
    requestValue.push(minPrice, maxPrice);
  }

  if (createdDate !== undefined && createdDate !== null && createdDate !== "") {
    whereQuery.push("DATE(currentDate) = ?");
    requestValue.push(createdDate);
  }

  const offset = (page - 1) * limit;

  try {
    const whereClause = ` WHERE ${whereQuery.join(" AND ")}`;

    const queryString = `SELECT invoice.id,invoiceId, customerName, totalPrice,currentDate, statusName FROM ${
      process.env.DB_NAME
    }.invoice
      left join invoicestatus on invoice.statusId = invoicestatus.id
      left join customercompany on invoice.customercompanyId = customercompany.id
      ${whereQuery.length ? whereClause : ""} 
      ORDER BY currentDate desc
      limit ? offset ?`;

    const queryParams = [...requestValue, +limit, +offset];

    const [limitResults] = await database.query(queryString, queryParams);

    limitResults ? res.status(200).send(limitResults) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const [deleteInvoice] = await database.query(
      "delete from invoice where invoiceId = ?",
      [id]
    );

    deleteInvoice.affectedRows ? res.sendStatus(200) : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const selectInvoiceById = async (req, res) => {
  try {
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

    findDetails.length || findInvoice.length
      ? res.status(200).send({ findInvoice, findDetails })
      : res.sendStatus(404);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

const updateInvoiceDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, price } = req.body;

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

    const [updateTable] = await database.query(invoiceDetails, [
      ...updateValues,
      id,
    ]);

    updateTable.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

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
