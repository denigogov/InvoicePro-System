const database = require("./database");

const allCustomers = async (_, res) => {
  try {
    const [findcustomers] = await database.query(
      "select * from customercompany"
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

module.exports = {
  allCustomers,
  createCustomerCompany,
};
