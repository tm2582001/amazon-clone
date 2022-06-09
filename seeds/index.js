const mongoose = require('mongoose');
const productData = require('./data');
const random = require('../utils/random/random.util');

const Product = require('../models/product/product.models');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/amazonClone';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const seedDB = async ()=>{
    await Product.deleteMany({});
    
    for(const data of productData ){
        const product = new Product({
            name: data["Product Title"],
            price: data.Price,
            quantity: random(10,30),
            category: data.Category,
        })
        await product.save();
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close();
}) ;