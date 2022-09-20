const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
    name: String,
    description: String,
    brand: String,
    price: Number,
    image: String,
    category: String,
});

module.exports = Product;
