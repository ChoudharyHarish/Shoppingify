const jwt = require('jsonwebtoken')

const authMiddleWare = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(400).json({ "message": "User not authenticated" })
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.id, userName: payload.name };
        next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ "message": "Something went wrong" })
    }
}

module.exports = authMiddleWare;