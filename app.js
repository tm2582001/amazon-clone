const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const Product = require('./models/product/product.models');

const searchItemsRoute = require('./routes/search/search.routes');
const homeRoute = require('./routes/home/home.routes');

const catchError = require('./middleware/catch-error/cath-error.middleware');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/amazonClone';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async() => {
  try{
    app.locals.cat = await Product.distinct('category');
  }catch(e){
    console.log(e);
  }
  console.log("database connected");
});


app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,'public')));

app.use('/',homeRoute);

app.use('/search',searchItemsRoute);

app.use(catchError);

const port = process.env.PORT || 8080


app.listen(port,()=>{
  console.log(`Server running on ${port}`)
});