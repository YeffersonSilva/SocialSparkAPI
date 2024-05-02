//import dependencies

const connection= requiere('./database/connection')
const express = require('express');
const cors = require('cors');


// Connection to the database
connection();


//create a connection to server

const app = express();
const PORT = process.env.PORT || 3000;

// config cors
app.use(cors());

// convert data the body a object the json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// loading config routes

// put server  listing petitions http

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});