require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Define the Swagger specification
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nexigo API",
      version: "2.0.0",
      description: `Nexigo API documentation for invoice management and generation. Demo Version 
      
      ${process.env.FRONTEND__URL} 
      `,
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? process.env.BACKENDURLFORDCRONJOB
            : "http://localhost:4000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path to the API docs
  apis: ["docu/**/*.yaml"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
