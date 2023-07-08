const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.mongoURI;

const connectDb = async()=>{
    try {
      const connect = await mongoose.connect(mongoURL);
      console.log("Database connected",connect.connection.host);  
    } catch (error) {
       console.log(error);
       process.exit(1);
    }
}

module.exports = connectDb