const mongoose = require('mongoose');
const productData = require('./data');
const random = require('../utils/random/random.util');

const Product = require('../models/product/product.models');
const Category = require('../models/category/category.model');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/amazonClone';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const seedDB = async ()=>{
    await Product.deleteMany({});
    await Category.deleteMany({});
    
    for(const data of productData ){
        const product = new Product({
            name: data["Product Title"],
            price: data.Price,
            quantity: random(10,30),
            category: []
        })
        console.log(data.Category);

        // saving category
        for(const cat of data.Category){
            console.log(cat);
            let newCat = await Category.findOne({category:cat});
            if(!newCat){
                newCat = new Category({
                    category: cat
                });
                console.log(newCat);
                await newCat.save();
                console.log('here');
            }
            product.category.push(newCat);
        }

        // saving product
        await product.save();
        // break;
    }
    
}

seedDB().then(()=>{
    mongoose.connection.close();
});