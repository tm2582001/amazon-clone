const Product = require('../../models/product/product.models');

const searchItems = async (req,res)=>{
    const {cat, search} = req.query;

    if(!search||!cat) return res.redirect('/');

    let searchResult;
    const searchRegEx = new RegExp(search, 'i')
    
    //--partial search 
    if(cat === 'All Category'){
        searchResult = await Product.find({name:searchRegEx});
    }else{
        searchResult = await Product.find({$and:[{name:searchRegEx},{category:cat}]});
    }

    res.render('pages/search',{searchResult});


    // !!!!-----full teaxt search  it also need indexing which is done in models file

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