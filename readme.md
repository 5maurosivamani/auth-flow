# Auth Flow Project

This project is a Node.js application that demonstrates a basic authentication flow.

## Features

- User registration
- User login
- Password hashing
- Token-based authentication

## Technologies Used

- Node.js
- Express
- Mysql
- Sequelize
- bcryptjs
- jsonwebtoken

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/5maurosivamani/auth-flow.git
   ```
2. Navigate to the project directory:
   ```sh
   cd auth-flow
   ```
3. Install the dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```env
    PORT=5000

    # DATABASE
    DB_HOST=localhost
    DB_NAME=auth_db
    DB_USER=
    DB_PASSWORD=

    # B-CRYPT
    HASH_SECRET=
    SALT_ROUNDS=10

    # JWT
    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRES_IN=5m
    REFRESH_TOKEN_EXPIRES_IN=1d
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```
2. The server will be running at `http://localhost:3000`.

## Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login a user and receive a JWT token
- `POST /auth/logout` - Logout a user and invalidate the refresh token
- `GET /auth/refresh` - Refresh the access token using a valid refresh token
- `GET /users` - Access a protected route (requires a valid JWT token)

<!-- ## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. -->

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any questions or feedback, please contact [5maurosivami@gmail.com](mailto:5maurosivami@gmail.com).

