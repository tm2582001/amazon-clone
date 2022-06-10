const Product = require('../../models/product/product.models');

const searchItems = async (req,res,next)=>{
    const {cat, search} = req.query;
    let searchResult;
    const searchRegEx = new RegExp(search, 'i')
    
    //--partial search 
    if(cat === 'All Category'){
        searchResult = await Product.find({name:searchRegEx});
    }else{
        searchResult = await Product.find({$and:[{name:searchRegEx},{category:cat}]});
    }

    res.render('pages/search',{searchResult});
    // -----full teaxt search
    // if(cat === 'All Category'){
        // searchResult = await Product.find({$text:{$search:search}});
    // }else{
        // searchResult = await Product.find({$and:[{$text:{$search:search}},{category: cat}]});
    // }

    // ---searching for category
    // searchResult = await Product.find({category: cat});

    // --- gives indexes in mongoose
    // const hell = await Product.collection.getIndexes({full: true});
    // console.log(hell);
    // res.send(searchResult);

}

module.exports = searchItems;