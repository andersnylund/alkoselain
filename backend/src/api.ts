import { Request, Response, Router } from 'express';

import Category from './models/category';
import Product from './models/product';

const router = Router();

// TODO: Create catch all
const error = {
  error: 'oops... something went wrong',
};

router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await Category.query().limit(10);
    res.json(categories);
  } catch (e) {
    res.json(error).status(500);
  }
});

router.get('/products', async (req: Request, res: Response) => {
  try {
    const { category, orderBy, order } = req.query;
    let { page } = req.query;
    page = Number(page);
    if (page <= 1) {
      page = undefined;
    }
    let query = Product.query();
    query = category ? query.where('tyyppi', category) : query;
    query = orderBy && order ? query.orderBy(orderBy, order) : query;
    query = page ? query.offset(Number(page) * 10) : query;
    const products = await query.limit(10);
    res.json(products);
  } catch (e) {
    res.json(error).status(500);
  }
});

router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.query().findById(req.params.id);
    res.json(product);
  } catch (e) {
    res.json(error).status(500);
  }
});

export default router;
