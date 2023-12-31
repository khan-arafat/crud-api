const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require('dotenv').config();
const cors = require('cors')


connectDb(); 

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json());

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, ()=>console.log("server running on port "+port));
