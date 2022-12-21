const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    note: String,
    image: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        required: true
    }
})


const Product = new mongoose.model('Product', ProductSchema);
module.exports = Product;