const database = require("./database");

const lastInvoiceId = async (_, res) => {
  try {
    const [lastId] = await database.query(
      "SELECT id as lastId FROM alltransport.invoice ORDER BY id DESC LIMIT 1"
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
    const { date, companyInfoId, customercompanyId, createdById, totalPrice } =
      req.body;

    // WHEN I CREATE INVOICE I DON'T ADD THE INVOICE NUMBER I UPDATE THE TABLE IN STEP-4 AND ADD THEN -- BECAUSE WHEN I DELETE SOME INVOICE LATER WHEN CREATE NEW INVOICE I DON'T GET THE CORRECT INVOICE ID

    const [createInvoiceQuery] = await database.query(
      "insert into invoice (date,companyInfoId,customercompanyId,createdById,totalPrice) values(?,?,?,?,?)",
      [date, companyInfoId, customercompanyId, createdById, totalPrice]
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
    } = req.body;

    const updateFields = [];
    const updateValues = [];

    if (invoiceId !== undefined) {
      updateFields.push("invoiceId = ?");
      updateValues.push(invoiceId);
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

const allInvoicesPagination = async (req, res) => {
  const { page, limit } = req.query;

  const offset = (page - 1) * limit;

  try {
    const [limitResults] = await database.query(
      `SELECT invoice.id,invoiceId, customerName, totalPrice,currentDate, statusName FROM alltransport.invoice
      left join invoicestatus on invoice.statusId = invoicestatus.id
      left join customercompany on invoice.customercompanyId = customercompany.id
      ORDER BY invoiceId desc
      limit ? offset ?`,
      [+limit, +offset]
    );

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
      `SELECT  invoiceId,currentDate,totalPrice ,statusName,customerName,country,city,street,zipcode,idNumber FROM alltransport.invoice
    left join invoicestatus on invoice.statusId = invoicestatus.id
    left join customercompany on invoice.customercompanyId = customercompany.id
    where invoiceId = ? `,
      [id]
    );

    const [findDetails] = await database.query(
      `select description,price from invoicedetail
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

module.exports = {
  createInvoice,
  lastInvoiceId,
  createInvoiceDetails,
  allInvoicesPagination,
  deleteInvoice,
  updateInvoice,
  selectInvoiceById,
};
