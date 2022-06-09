const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name:{
        type: String,
        required: true
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
    category:{
        type: [String],
        required: true
    }
});

module.exports = model('Product',productSchema);