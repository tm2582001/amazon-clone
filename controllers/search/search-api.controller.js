const Product = require('../../models/product/product.models');
const ExpressError = require('../../utils/express-error/express-error.util'); 

const searchItemsApi = async(req,res)=>{
    const {cat, search} = req.query;

    if(!search || !cat) throw new ExpressError('Missing query parameters',400);

    let searchResult;
    const searchRegEx = new RegExp(`^${search}`, 'i');
    
    //--partial search 
    if(cat === 'All Category'){
        searchResult = await Product.find({name:searchRegEx}).limit(5);
    }else{
        searchResult = await Product.find({$and:[{name:searchRegEx},{category:cat}]}).limit(5);
    }

    res.status(200).json(searchResult);
}

module.exports = searchItemsApi;