const Product = require("../models/products")
const User = require("../models/user");

const getAll = async (req, res) => {

    const products = await Product.aggregate([
        {
            $group: {
                _id: { category: "$category" },
                products: { $push: '$name' }
            }
        }
    ]);

    data = products.filter((item) => item.category)
    return res.status(202).json(products);
}

const getProduct = async (req, res) => {
    const { name } = req.body;
    try {
        const product = await Product.find({ name });
        return res.status(202).json(product);
    }
    catch (error) {
        console.log(error.message)
        return res.status(404).json({ "message": "Something went wrong" });
    }

}
const createProduct = async (req, res) => {
    const { name, note, category, image } = req.body;
    try {
        let product = await Product.findOne({ name, category });
        if (product) {
            await product.updateOne({ name, note, category, image }, { new: true });
            product = await Product.findOne({ name });
            return res.status(202).json(product);
        }
        else {
            const newProduct = await Product.create({ name, note, category, image });
            return res.status(202).json(newProduct);
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(404).json({ "message": "Something went wrong" });
    }
}
const updateProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const product = await Product.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        return res.status(202).json(product);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).json({ "message": "Something went wrong" });
    }
}

const deleteProduct = async (req, res) => {
    const { name, category } = req.body;
    try {
        const product = await Product.deleteOne({ name, category });
        return res.status(202).json({ "message": "Deleted Successfully ", product });

    }
    catch (error) {
        console.log(error.message);
        res.status(404).json({ "message": "Something went wrong" });
    }
}



module.exports = { getAll, createProduct, updateProduct, getProduct, deleteProduct };