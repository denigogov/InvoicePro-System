# InvoicePro System

![GitHub last commit](https://img.shields.io/github/last-commit/denigogov/InvoicePro-System)

**InvoicePro** **System** is a project designed for invoice management and generation. It targets small and medium-sized companies in need of a tool to efficiently manage their invoices. The system aims to provide simplicity in invoice generation while offering features for secure data handling and customization based on company requirements

## About

InvoicePro System serves not only as a tool for invoice management but also as a platform where I explore cutting-edge techniques while continuously refining my coding practices. Through iterative development, I've noticed a significant improvement in my code quality and structure compared to previous projects. **From refining my coding style to enhancing folder organization, each iteration of this project marks a step forward in my journey as a developer. Your input and contributions are invaluable as I strive for continuous improvement in both functionality and code architecture**

## Features

- Two Factor Authentication
- Encryption of sensitive data
- Simple invoice generation through a 4-step form
- Viewing and filtering of invoices with search functionality
- Authorization for editing and deleting invoices by the owner or authorized users
- Invoice by status counting
- Updating company data
- Creating/Edit/Delete customer company data

### Planned Future Features

- Department creation with access control to specific app routes
- Selection of invoice designs from multiple options

## Installation

To run the InvoicePro System locally, follow these steps:

1. Clone this repository
2. Ensure you have MySQL installed and create a database
3. Create `.env` files in both the `client` and `server` directories based on the provided `.env.sample` files
4. Run `pnpm install` to install dependencies
5. Run `pnpm run dev` from the root directory to start both the front-end and back-end servers

```bash
pnpm run dev
```

## Technologies Used

### Frontend

- React
- TypeScript
- React Router
- SWR
- react-pdf
- Sass
- SweetAlert
- ESLint

### Backend

- Express
- MySQL2
- JWT
- Argon2
- SendGrid
- Joi
- Supertest
- Vite
- Compression

## Usage

After installation, the project will run on `localhost:3000` for the frontend and `localhost:4000` for the backend. Access the system through a web browser

## Contributing

We welcome contributions to improve InvoicePro System. If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request

## Contact

For questions or feedback related to the project, you can reach out to us through my [LinkedIn Profile](https://www.linkedin.com/in/dejangogov/)
