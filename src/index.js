//import dependencies
import express from 'express';
import cors from 'cors';
import connection from './database/connection.js';


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


//router test
app.get('/', (req, res) => {
    res.status(200).json({
        "id": 1,
        "nombre": "yefferson"
    });
})

// put server  listing petitions http

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});