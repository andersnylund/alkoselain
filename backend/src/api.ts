import express, { Request, Response } from 'express';

import Category from './models/category';
import Product from './models/product';

const router = express.Router();

router.get('/categories/all', async (req: Request, res: Response) => {
  const categories = await Category.query().limit(10);
  res.json(categories);
});

router.get('/products/all', async (req: Request, res: Response) => {
  const products = await Product.query().limit(10);
  res.json(products);
});

export default router;
