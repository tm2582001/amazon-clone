if(process.env.NODE_ENV!=="production") require('dotenv').config();
const mongoose = require('mongoose');
const productData = require('./data');
const random = require('../utils/random/random.util');

const Product = require('../models/product/product.model');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/amazonClone';
mongoose.connect(dbUrl,{
    family:4
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const seedDB = async ()=>{
    await Product.deleteMany({});
    // await Category.deleteMany({});
    
    for(const data of productData ){
        const product = new Product({
            name: data["Product Title"],
            price: data.Price,
            quantity: random(10,30),
            category: data.Category
        });
        // saving product
        await product.save();
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close();
});