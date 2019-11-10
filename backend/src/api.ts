import express, { Request, Response } from 'express';

import { Category } from './models';

const router = express.Router();

router.get('/categories/all', async (req: Request, res: Response) => {
  const categories = await Category.query();
  res.json(categories);
});

export default router;
