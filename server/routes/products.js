const express = require("express");
const router = express.Router();
const { getAll, createProduct, updateProduct, deleteProduct, getProduct, getHistory } = require('../controllers/product')


router.get("/all", getAll);
router.post('/product', getProduct);
router.post("/create", createProduct);
router.patch("/update", updateProduct);
router.delete("/delete", deleteProduct);

module.exports = router