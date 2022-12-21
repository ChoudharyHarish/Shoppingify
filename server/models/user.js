const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    list: {
        type: Array,
        default: [],
    },
    listName: {
        type: 'String',
        default: "Shopping"
    },
    history: {
        type: Array,
        default: []
    }

})



UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ email: this.email, id: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

UserSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}


const User = new mongoose.model('User', UserSchema);
module.exports = User;