const database = require("./database");

const allCustomers = async (req, res) => {
  try {
    const { id } = req.params;

    const [findcustomers] = await database.query(
      `select * from customercompany ${id ? "Where id = ?" : ""}`,
      [id]
    );

    findcustomers.length
      ? res.status(200).send(findcustomers)
      : res.sendstatus(404);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const createCustomerCompany = async (req, res) => {
  try {
    const { customerName, country, city, street, zipcode, idNumber } = req.body;

    const [createQuery] = await database.query(
      `insert into customercompany (customerName, country, city, street, zipcode ,idNumber) values(?,?,?,?,?,?)`,
      [customerName, country, city, street, zipcode, idNumber]
    );

    createQuery.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
};

const updateCustomerCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = [
      "customerName",
      "country",
      "city",
      "street",
      "zipcode",
      "idNumber",
    ];

    const updates = [];
    const updateValues = [];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        updateValues.push(req.body[field]);
      }
    });

    if (!updates.length) return res.sendStatus(400);

    const query = `UPDATE customercompany SET ${updates.join(
      ", "
    )} WHERE id = ?`;
    const [updateTable] = await database.query(query, [...updateValues, id]);

    updateTable.affectedRows ? res.sendStatus(200) : res.sendStatus(400);
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

module.exports = {
  allCustomers,
  createCustomerCompany,
  updateCustomerCompany,
};
