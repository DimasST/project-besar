import express from "express";
import cors from "cors";
import db from "./config/database.js";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import authRoutes from "./routes/authRoute.js";
import path from "path";
import cashierRoutes from "./routes/categoryRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public/images", express.static("public/images"));

// Routes
app.use("/products", productRoutes);
app.use("/", cashierRoutes);
app.use(authRoutes);
app.use(userRoute);
app.use(categoryRoute);
app.use(productRoute);

// ✅ Bungkus DB connection dan server start di IIFE async
(async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");
    await db.sync();
    
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
