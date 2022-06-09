const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    category: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = new model('Category',categorySchema);