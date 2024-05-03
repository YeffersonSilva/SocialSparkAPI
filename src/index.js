//import dependencies


const connection= require('./database/connection.js')
const express = require('express');
const cors = require('cors');

const UserRoutes = require('./routes/user.routes');
const PublicacionRoutes = require('./routes/publicacion.routes');
const FollowRoutes = require('./routes/follow.routes');


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
app.use('/api', UserRoutes);

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