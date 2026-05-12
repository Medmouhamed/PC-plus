const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {

        const { JWT_SECRET } = require("../env");
        const decoded = jwt.verify(token, JWT_SECRET);


        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
