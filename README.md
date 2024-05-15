# SocialSparkAPI

Welcome to **SocialSparkAPI**! This project is a comprehensive and scalable API designed to manage user interactions, publications, and follow relationships in a social media application. Built with modern technologies, SocialSparkAPI ensures robust performance and security, making it a great foundation for any social networking platform.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Running with Docker](#running-with-docker)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Registration, login, profile management, and avatar uploads.
- **Publications**: Create, update, delete, and retrieve user publications.
- **Follow System**: Follow/unfollow users, and retrieve followers/following lists.
- **Secure Authentication**: JWT-based authentication to secure API endpoints.
- **Pagination**: Efficient pagination for user lists and publications.
- **Dockerized**: Easily deployable using Docker and Docker Compose.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT**
- **Docker**
- **Docker Compose**
- **Multer**
- **Bcrypt**
- **Moment.js**
- **Validator**

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose
- MongoDB

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/socialsparkapi.git
   cd socialsparkapi
Install dependencies:

 ```sh

npm install
 ```
Set up environment variables:

Create a .env file in the root directory based on the .env.example file provided.

Start the server:

 ```

npm start
 ```
The server will run on http://localhost:3000.

## Environment Variables
Configure your environment variables in a .env file. Here are the essential variables:

 ```
PORT=3000
SECRET_KEY_JWT=your_secret_key
MONGODB_URI=mongodb://localhost:27017/socialspark

 ```

## Project Structure
Here's an overview of the project's structure:
 ```
socialsparkapi/
├── src/
│   ├── controllers/
│   │   ├── user/
│   │   ├── publication/
│   │   └── follow/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── database/
│   └── index.js
├── uploads/
│   └── avatars/
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
 ```
## API Endpoints
User Endpoints
- POST /api/user/register - Register a new user
- POST /api/user/login - User login
- GET /api/user/profile/:id - Get user profile
- PUT /api/user/update - Update user profile
- POST /api/user/upload - Upload user avatar
- GET /api/user/avatar/:file - Get user avatar
- GET /api/user/list/:page? - List users with pagination

## Publication Endpoints
- POST /api/publication/save - Save a new publication
- GET /api/publication/detail/:id - Get publication details
- DELETE /api/publication/remove/:id - Remove a publication
- GET /api/publication/user/:id/:page? - List user's publications with pagination
- GET /api/publication/all/:page? - List all publications with pagination
- PUT /api/publication/update/:id - Update a publication
- GET /api/publication/search - Search publications
  
## Follow Endpoints
- POST /api/follow/save - Follow a user
- DELETE /api/follow/unfollow/:id - Unfollow a user
- GET /api/follow/following/:id?/:page? - Get users followed with pagination
- GET /api/follow/followers/:id?/:page? - Get followers with pagination

## Running with Docker
Build and run the containers:
 ```
docker-compose up --build
 ```
This will build the Docker image and start the containers.

## Access the application:

The application will be accessible at http://localhost:3000.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request to contribute.

## License
This project is licensed under the MIT License.


