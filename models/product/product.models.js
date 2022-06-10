const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        index: true
    },
    price:{
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    },
    category:[{
        type: String,
        required: true,
        // index:true LEAVING THIS BEACUAE DURING TEXT SEARCH MONGOOSE SEARCH IN BOTH INDEXES
    }]
});

productSchema.index({name:'text'})
// productSchema.index({category:'text'})

module.exports = model('Product',productSchema);