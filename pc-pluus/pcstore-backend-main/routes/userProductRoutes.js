const express = require("express");
const router = express.Router();
const UserProduct = require("../models/userProduct");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // نستخدم 'uploads' مباشرة لأن السيرفر يعمل في المجلد الرئيسي
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


router.post("/", auth, upload.single("images"), async (req, res) => {
  try {
    // استخراج البيانات يدوياً للتأكد من وصولها
    const { name, description, category, price, location, phone } = req.body;

    // فحص سريع: إذا كانت الفئة غير موجودة، نعطي خطأ واضحاً
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const productData = {
      name,
      description,
      category,
      price,
      location,
      phone,
      owner: req.user._id,
      images: req.file ? `/uploads/${req.file.filename}` : null
    };

    const product = await UserProduct.create(productData);
    res.status(201).json(product);
  } catch (err) {
    console.error("🔥 Mongoose Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const products = await UserProduct.find()
    .populate("owner", "name");

  res.json(products);
});


router.get("/myposts", auth, async (req, res) => {
  try {
    const products = await UserProduct.find({
      owner: req.user._id
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", auth, upload.single("images"), async (req, res) => {
  try {
    const product = await UserProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // التأكد أن المستخدم هو صاحب المنشور
    if (product.owner.toString() !== req.user._id.toString()) {

      return res.status(403).json({ message: "Not authorized to edit this post" });
    
    }

    // تجهيز البيانات الجديدة من body
    const { name, description, category, price, location, phone } = req.body;

    // تحديث الحقول النصية
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.location = location || product.location;
    product.phone = phone || product.phone;

    // إذا قام المستخدم برفع صورة جديدة، نقوم بتحديث المسار
    if (req.file) {
      product.images = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);

  } catch (err) {
    console.error("🔥 Update Error:", err.message);
    res.status(500).json({ message: "Server error during update" });
  }
});


router.delete("/:id", auth, async (req, res) => {
  const product = await UserProduct.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  if (product.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await product.deleteOne();
  res.json({ message: "Deleted successfully" });
});

module.exports = router;