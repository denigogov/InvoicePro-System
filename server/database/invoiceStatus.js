const { CustomError } = require("../utility/customError");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const database = require("./database");

const invoiceStatus = handleTryCatch(async (req, res) => {
  const { id } = req.params;

  const [selectAllStatus] = await database.query("select * from invoicestatus");
  const [findPriceTaxDiscount] = await database.query(
    "select id, totalPrice,statusId,tax,discount from invoice where invoiceId = ? ",
    [id]
  );

  handleResponse(
    selectAllStatus || findPriceTaxDiscount,
    () => res.status(200).send({ selectAllStatus, findPriceTaxDiscount }),
    () => {
      throw CustomError.notFoundError(
        "Invoice Status Error, Not Found - Please try later"
      );
    }
  );
});

const allInvoiceStatus = handleTryCatch(async (_, res) => {
  const [selectAllStatus] = await database.query("select * from invoicestatus");

  handleResponse(
    selectAllStatus,
    () => res.status(200).send(selectAllStatus),
    () => {
      throw CustomError.notFoundError(
        "Invoice Status Error, Not Found - Please try later"
      );
    }
  );
});

const updateInvoiceStatus = handleTryCatch(async (req, res) => {
  const { id } = req.params;
  const { statusName } = req.body;

  const [updateQuery] = await database.query(
    `UPDATE invoicestatus set statusName =? where id = ?`,
    [statusName, id]
  );

  handleResponse(
    updateQuery,
    () => res.sendStatus(200),
    () => {
      throw CustomError.badRequestError("Update failed. No rows affected");
    }
  );
});

module.exports = { invoiceStatus, allInvoiceStatus, updateInvoiceStatus };
