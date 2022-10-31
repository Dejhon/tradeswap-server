const mongoose = require('mongoose');

const Category = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true,
    }
});

const Categories = mongoose.model('category', Category);
module.exports = Categories;