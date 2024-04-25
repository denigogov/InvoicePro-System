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
    const {
      invoiceId,
      date,
      companyInfoId,
      customercompanyId,
      createdById,
      totalPrice,
    } = req.body;

    const [createInvoiceQuery] = await database.query(
      "insert into invoice (invoiceId,date,companyInfoId,customercompanyId,createdById,totalPrice) values(?,?,?,?,?,?)",
      [
        invoiceId,
        date,
        companyInfoId,
        customercompanyId,
        createdById,
        totalPrice,
      ]
    );

    createInvoiceQuery.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err);
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
      `SELECT * FROM invoice

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

    limitResults ? res.status(200).send(limitResults) : res.sendstatus(400);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createInvoice,
  lastInvoiceId,
  createInvoiceDetails,
  allInvoicesPagination,
};
