const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,              
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://Medmohamed:PCstorepcSTORE@cluster0.vgirkow.mongodb.net/?appName=Cluster0")
    .then(() => {
        console.log(`connected sucssefuly with DB`)
    }).catch((error) => {
        console.log(`connected failed with DB ${error}`)
    })



const userRoutes = require("./routes/userRoutes")
app.use("/api/users", userRoutes);


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("✅ 'uploads' folder created successfully");
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




const productRoutes = require("./routes/productRoutes")
app.use("/api/products", productRoutes);

const cpuRoutes = require("./routes/cpuRoutes")
app.use("/api/cpu", cpuRoutes);

const gpuRoutes = require("./routes/gpuRoutes")
app.use("/api/gpu", gpuRoutes);

const motherboardRoutes = require("./routes/motherboardRoutes")
app.use("/api/motherboard", motherboardRoutes);

const ramRoutes = require("./routes/ramRoutes")
app.use("/api/ram", ramRoutes);

const storageRoutes = require("./routes/storageRoutes")
app.use("/api/storage", storageRoutes);

const psuRoutes = require("./routes/psuRoutes")
app.use("/api/psu", psuRoutes);

const monitorRoutes = require("./routes/monitorRoutes")
app.use("/api/monitor", monitorRoutes);

const caseRoutes = require("./routes/caseRoutes")
app.use("/api/case", caseRoutes);

const accessoryRoutes = require("./routes/accessoryRoutes")
app.use("/api/accessory", accessoryRoutes);

const favoriteRoutes = require("./routes/favoriteRoutes");
app.use("/api/favorites", favoriteRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);

const userProductRoutes = require("./routes/userProductRoutes");
app.use("/api/userproducts", userProductRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
})


