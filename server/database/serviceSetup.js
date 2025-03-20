const { CustomError } = require("../utility/customError");
const { handleTryCatch, handleResponse } = require("../utility/tryCatch");
const { decrypt } = require("../auth/encript");
const database = require("./database");

const textContent = handleTryCatch(async (req, res) => {
  const clientApiKey = req.get("x-api-key");

  const decryptedApiKey = decrypt(clientApiKey);

  const [fetchAllServices] = await database.query(
    "SELECT service_name, is_active FROM service_status WHERE service_name = ?",
    [decryptedApiKey]
  );

  const formattedServices = fetchAllServices.map((service) => ({
    name: service.service_name,
    active: service.is_active === 1,
  }));

  handleResponse(
    formattedServices,
    () => res.status(200).send(formattedServices),
    () => {
      throw CustomError.unauthorizedError("Unauthorized: Invalid API Key");
    }
  );
});

const updateService = handleTryCatch(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const [updateQuery] = await database.query(
    `UPDATE service_status set is_active = ? where id = ?`,
    [isActive, id]
  );

  handleResponse(
    updateQuery,
    () => res.sendStatus(200),
    () => {
      throw CustomError.badRequestError("Update failed. No rows affected");
    }
  );
});

const createService = handleTryCatch(async (req, res) => {
  const { serviceName, isActive } = req.body;

  const [createServices] = await database.query(
    "insert into service_status (service_name, is_active) values(?,?)",
    [serviceName, isActive]
  );

  handleResponse(
    createServices,
    () => res.status(200).send(createServices),
    () => {
      throw CustomError.badRequestError("Failed to create invoice");
    }
  );
});

module.exports = {
  textContent,
  updateService,
  createService,
};
