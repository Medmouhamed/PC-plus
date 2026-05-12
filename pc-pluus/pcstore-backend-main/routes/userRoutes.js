const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({ name, email, password: hashedPassword });

        const { JWT_SECRET } = require("../env");
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });


        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });

        res.status(201).json({
            message: "User created and logged in successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        const { JWT_SECRET } = require("../env");
        const token = jwt.sign({
            id: user._id
        },
            JWT_SECRET,
            { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.json({
            message: "Login successful",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
});

router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
});


router.get("/test", authMiddleware, (req, res) => {
    res.json({ message: "Middleware works!", user: req.user });
});


module.exports = router;