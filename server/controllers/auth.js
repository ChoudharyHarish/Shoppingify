const User = require("../models/user")

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (user.comparePassword(password)) {
                return res.status(404).json({ "message": "User already exists" });
            }
            else {
                return res.status(404).json({ "message": "Email is already in use" });

            }
        }
        const newUser = await User.create({ name, email, password });
        const token = newUser.createJWT();
        return res.status(202).json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ "message": "Something went wrong" });
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (user.comparePassword(user.password)) {
                const token = user.createJWT();
                return res.status(202).json({ token });
            }
            else {
                return res.status(404).json({ "message": "Password not matches" });
            }
        }
        else {
            return res.status(404).json({ "message": "Invalid Credientials" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Something went wrong" });

    }
}

module.exports = { signup, login }