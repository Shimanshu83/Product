const express = require('express');
const cors = require('cors');

const productRoute = require("./routes/productRoute"); 
const categoryRoute = require("./routes/categoryRoute");

const connectDB = require('./config/connection'); 

require('dotenv').config() ;


const app = express();

app.use(cors());
app.use(express.json({limit : "30mb", extended : true}));
app.use(express.urlencoded({limit : "30mb", extended : true}));
connectDB() ; 

app.use('/category' , categoryRoute);

app.use('/' , productRoute); 

app.listen(process.env.PORT); 