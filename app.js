if(process.env.NODE_ENV!=="production") require('dotenv').config();

const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')

const Product = require('./models/product/product.model');

const searchItemsRoute = require('./routes/search/search.route');
const searchItemsApiRoute = require('./routes/search/search-api.route');
const homeRoute = require('./routes/home/home.route');
const registerRoute = require('./routes/register/register.route');
const signInRoute = require('./routes/sign-in/sign-in.route');
const pageNotFoundRoute = require('./routes/page-not-found/page-not-found.route');
const pageNotFoundApiRoute = require('./routes/page-not-found/page-not-found-api.route');

const catchError = require('./middlewares/catch-error/cath-error.middleware');
const deserializedUser = require('./middlewares/deserialize-user/deserialize-user.middleware');
const mapUser = require('./middlewares/map-user/map-user.middleware');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/amazonClone';
mongoose.connect(dbUrl,{
  // family: 4, // Use IPv4, skip trying IPv6  or we can use mongodb://127.0.0.1:27017/amazonClone this url
});

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

app.use('/signin', signInRoute);

app.use('/api/search',searchItemsApiRoute);

app.use('/api/*',pageNotFoundApiRoute);

app.use('*',pageNotFoundRoute);

app.use(catchError);

const port = process.env.PORT || 8080


app.listen(port,()=>{
  console.log(`Server running on ${port}`)
});