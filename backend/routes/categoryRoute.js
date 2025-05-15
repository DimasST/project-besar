import express from 'express';
import { getProducts } from '../controller/productController.js';
import { getCategories } from '../controller/categoryController.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);

export default router;
