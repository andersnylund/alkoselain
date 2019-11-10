import { Model } from 'objection';
import Knex from 'knex';
import uuid from 'uuid/v4';

import './env';
import { getProducts, sanitizeProduct } from './helpers';
import { UnsanitizedProduct, Product } from '../../shared/types';
import { Category } from './models';
import knexConfig from '../knexfile';

const knex = Knex(knexConfig);
knex.migrate.latest();
Model.knex(knex);

const runImport = async (): Promise<void> => {
  const deletedCategories = await Category.query().delete();
  console.log('deletedCategories', deletedCategories);

  const unzanitisedProducts: UnsanitizedProduct[] = await getProducts();
  const products: Product[] = unzanitisedProducts.map(sanitizeProduct);

  const categories: string[] = Array.from(new Set(products.map(p => p.tyyppi)));

  const insertedCategories = await Promise.all(
    categories.map(category =>
      Category.query().insert({ id: uuid(), name: category })
    )
  );
  console.log('insertedCategories', insertedCategories.length);
  knex.destroy();
  process.exit();
};

runImport();
