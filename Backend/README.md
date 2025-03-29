SupplySync - Backend

SupplySync backend is built using Node.js, Express.js, and MongoDB. It serves as the core of the SupplySync application, handling API requests, managing database interactions, and ensuring smooth backend operations.

Features

RESTful API endpoints for managing users, inventory, and orders

MongoDB database integration with Mongoose ORM

Authentication and authorization (JWT-based security)

Error handling and logging

Scalable and modular architecture


Installation

Prerequisites

Ensure you have the following installed:

Node.js (latest stable version recommended)

MongoDB (locally or using a cloud provider like MongoDB Atlas)


Setup

1. Clone the repository:

git clone https://github.com/Harshninave04/supplysync-backend.git
cd supplysync-backend


2. Install dependencies:

npm install


3. Create a .env file in the root directory and configure your environment variables:

PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key



Running the Server

To start the server, use:

npm start

By default, the server runs on http://localhost:5000

For development mode with hot reloading:

npm run dev

Technologies Used

Node.js - JavaScript runtime

Express.js - Web framework for Node.js

MongoDB & Mongoose - Database and ODM

JSON Web Token (JWT) - Authentication

Dotenv - Environment variable management


Contributing

Feel free to submit issues or pull requests if you’d like to contribute to the project.

License

This project is licensed under the MIT License.

