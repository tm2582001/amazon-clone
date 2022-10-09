if(process.env.NODE_ENV!=="production") require('dotenv').config();

const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')

const Product = require('./models/product/product.models');

const searchItemsRoute = require('./routes/search/search.routes');
const searchItemsApiRoute = require('./routes/search/search-api.router');
const homeRoute = require('./routes/home/home.routes');
const registerRoute = require('./routes/register/register.routes');
const pageNotFoundRoute = require('./routes/page-not-found/page-not-found.routes');
const pageNotFoundApiRoute = require('./routes/page-not-found/page-not-found-api.routes');

const catchError = require('./middleware/catch-error/cath-error.middleware');
const deserializedUser = require('./middleware/deserialize-user/deserialize-user.middleware');
const mapUser = require('./middleware/map-user/map-user.middleware');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/amazonClone';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async() => {
  try{
    app.locals.cat = await Product.distinct('category');
    
    // give no of count for a query
    // const wtf = await Product.count({name:'Dekor Classic Hands-Free Diaper Pail, Sage'});
    // console.log(wtf);
  }catch(e){
    console.log(e);
  }
  console.log("database connected");
});


app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.use(deserializedUser);
app.use(mapUser);


app.use('/',homeRoute);

app.use('/search',searchItemsRoute);

app.use('/register', registerRoute);

app.use('/api/search',searchItemsApiRoute);

app.use('/api/*',pageNotFoundApiRoute);

app.use('*',pageNotFoundRoute);

app.use(catchError);

const port = process.env.PORT || 8080


app.listen(port,()=>{
  console.log(`Server running on ${port}`)
});