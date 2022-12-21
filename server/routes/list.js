const express = require("express");
const router = express.Router();

const { getUserList, addName, addItemInUserList, deleteProduct, getHistory } = require("../controllers/list")

router.get('/userList', getUserList);
router.get('/history', getHistory);
router.post('/listName', addName);
router.post('/addItem', addItemInUserList);
router.delete('/deleteItem', deleteProduct);


module.exports = router