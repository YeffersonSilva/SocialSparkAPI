// Import dependencies
const connection = require("./database/connection.js");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const UserRoutes = require("./routes/user.routes");
const PublicationRoutes = require("./routes/publication.routes.js");
const FollowRoutes = require("./routes/follow.routes.js");

const { errorHandler } = require('./middlewares/errorHandler');

// Connect to the database
connection();

// Create an Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(cors());

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load routes
app.use("/api/user", UserRoutes);
app.use('/api/publication', PublicationRoutes);
app.use('/api/follow', FollowRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        id: 1,
        nombre: "yefferson",
    });
});

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
