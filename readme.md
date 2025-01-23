# Ideal Node Project

This project is an ideal Node.js application with PostgreSQL and Sequelize database integration. It includes user authentication (login and signup) and CRUD operations, along with comprehensive error handling.

## Features

- User authentication (login and signup)
- CRUD operations for managing data
- PostgreSQL database integration using Sequelize ORM
- Comprehensive error handling
- Internationalization (i18n) support for Gujarati (gu), Hindi (hi), and English (en)
- Response language configuration via `Accept-Language` header
- Input validation and sanitization using `validator.js`

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Hari-Zignuts/ideal-node-project.git
    cd ideal-node-project
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    NODE_ENV=development
    APP_PORT=your_app_port

    # DB credentials
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    DB_HOST=your_db_host
    DB_PORT=your_db_port

    # JWT info
    JWT_SECRET_KEY=your_jwt_secret_key
    JWT_EXPIRES_IN=your_jwt_expires_in

    # Admin credentials
    ADMIN_EMAIL=your_admin_email
    ADMIN_PASSWORD=your_admin_password
    ```

4. Run database migrations:
    ```sh
    npx sequelize-cli db:migrate
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running on `http://localhost:your_app_port`.

## Error Handling

The project includes comprehensive error handling for:

- Validation errors
- Authentication errors
- Database errors
- Not found errors
- General server errors

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

### Error Handling

All endpoints include comprehensive error handling and will return appropriate HTTP status codes and error messages for validation errors, authentication errors, database errors, not found errors, and general server errors.