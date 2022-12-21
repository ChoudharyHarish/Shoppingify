const Product = require("../models/products")
const User = require("../models/user");


const getHistory = async (req, res) => {
    const { userId } = req.user;
    const user = await User.findById(userId);
    return res.status(202).json(user?.history);
}

const addName = async (req, res) => {
    const { userId } = req.user;
    try {
        const user = await User.findById(userId);
        user.listName = req.body.name;
        await user.save();
        return res.status(200).json({ "message": "Name Updated Successfully", listName: user.listName });
    }
    catch (error) {
        console.log(error.message);
        res.status(404).json({ "message": "Something went wrong" });
    }
}

const getUserList = async (req, res) => {


    const { userId } = req.user;

    try {
        const user = await User.findById(userId);
        const { listName, list } = user;
        return res.status(200).json({ listName, list });
    }
    catch (error) {
        console.log(error.message);
        res.status(404).json({ "message": "Something went wrong" });
    }
}
const addItemInUserList = async (req, res) => {
    const { userId } = req.user;
    try {
        const { category, name } = req.body;
        const user = await User.findById(userId);
        let results = user.list.filter((item) => item?.category === category);
        if (results.length == 0) {
            const item = {
                category: category,
                items: [{ name, quantity: 1 }]
            }
            user.list.push(item);
        }
        else {
            const itemIndex = results[0].items.findIndex((item) => item.name === name);
            if (itemIndex >= 0) {
                results[0].items[itemIndex].quantity += 1;
            }
            else {
                results[0].items.push({ name, quantity: 1 });
            }
            const index = user.list.findIndex(item => item?.category === category)
            user.list[index] = results[0];
        }

        console.log("Here is the ")
        console.log(user.list);
        const history = {
            name: user.listName,
            date: new Date().toLocaleDateString(),
            status: 'incompleted',
            list: user.list
        }
        user.history = user.history.filter((history) => history.name !== user.listName);
        user.history.push(history);
        console.log(user.history)
        // let result = user.history.filter((history) => history.date = date)
        // if (result.length < 0) {
        // }
        await user.save();
        return res.status(202).json(user.list);
    }
    catch (error) {
        console.log(error.message);
        res.status(404).json({ "message": "Something went wrong" });
    }

}
const deleteProduct = async (req, res) => {
    const { name, category, deleteComplete } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        let results = user.list.filter((item) => item?.category === category);

        if (deleteComplete === 1) {
            results[0].items = results[0].items.filter((item) => item.name != name);
        }
        else {
            const itemIndex = results[0].items.findIndex((item) => item.name === name);
            if (itemIndex >= 0) {
                if (results[0].items[itemIndex].quantity === 1) {
                    results[0].items = results[0].items.filter((item) => item.name != name);
                }
                else {
                    results[0].items[itemIndex].quantity -= 1;
                }
            }
            else {
                results[0].items = results[0].items.filter((item) => item.name != name);
            }
        }
        user.list = user.list.filter((item) => item.category != category);
        if (results[0].items.length > 0) user.list.push(results[0]);

        await user.save();
        return res.status(202).json({ "message": "Deleted Successfully" });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ "message": " Something went wrong" });
    }

}

module.exports = { getHistory, addName, getUserList, addItemInUserList, deleteProduct };
