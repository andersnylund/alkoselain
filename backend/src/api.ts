import { Request, Response, Router } from 'express';

import Category from './models/category';
import Product from './models/product';
import { AllCategoriesUUID, SortOrder } from '../../shared/types';

const allCategoriesId: AllCategoriesUUID =
  '93976e57-7d96-40c3-8860-8ffcc76b233d';

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
    const {
      categoryId,
      orderBy,
      order,
      searchString,
    }: {
      categoryId: string;
      orderBy: string;
      order: SortOrder;
      searchString: string;
    } = req.query;
    let { page } = req.query;
    page = Number(page);
    if (page <= 1) {
      page = undefined;
    }
    let query = Product.query();
    if (categoryId) {
      if (categoryId !== allCategoriesId) {
        query = categoryId ? query.where('tyyppiId', categoryId) : query;
      }
    }
    query =
      orderBy && order
        ? query.orderBy(orderBy, order).whereNotNull(orderBy)
        : query;
    query = page ? query.offset(Number(page) * 10) : query;
    query = searchString
      ? query.andWhere(builder =>
          builder
            .where('id', 'ilike', `%${searchString}%`)
            .orWhere('nimi', 'ilike', `%${searchString}%`)
            .orWhere('valmistaja', 'ilike', `%${searchString}%`)
            .orWhere('erityisryhma', 'ilike', `%${searchString}%`)
            .orWhere('valmistusmaa', 'ilike', `%${searchString}%`)
            .orWhere('alue', 'ilike', `%${searchString}%`)
            .orWhere('etikettimerkintoja', 'ilike', `%${searchString}%`)
            .orWhere('rypaleet', 'ilike', `%${searchString}%`)
            .orWhere('luonnehdinta', 'ilike', `%${searchString}%`)
        )
      : query;
    const products = await query.limit(10);
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json(error);
  }
});

router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.query().findById(req.params.id);
    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json(error);
  }
});

export default router;
