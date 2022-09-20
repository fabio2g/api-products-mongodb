const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String,
});

module.exports = Product;
