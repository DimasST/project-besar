import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controller/productController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Konfigurasi penyimpanan file gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // simpan gambar ke folder ini
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route CRUD untuk produk
router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct); // upload image
router.put("/:id", upload.single("image"), updateProduct); // bisa disiapkan untuk update image juga
router.delete("/:id", deleteProduct);

export default router;
