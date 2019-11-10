import { Model } from 'objection';
import Knex from 'knex';
import uuid from 'uuid/v4';

import './env';
import { getProducts, sanitizeProduct } from './helpers';
import { UnsanitizedProduct, Product } from '../../shared/types';
import CategoryModel from './models/category';
import ProductModel from './models/product';
import knexConfig from '../knexfile';

const knex = Knex(knexConfig);
knex.migrate.latest();
Model.knex(knex);

const runImport = async (): Promise<void> => {
  const deletedCategories = await CategoryModel.query().delete();
  console.log('deletedCategories', deletedCategories);
  const deletedProducts = await ProductModel.query().delete();
  console.log('deletedProducts', deletedProducts);

  const unzanitisedProducts: UnsanitizedProduct[] = await getProducts();
  const products: Product[] = unzanitisedProducts.map(sanitizeProduct);

  const categories: string[] = Array.from(new Set(products.map(p => p.tyyppi)));

  const insertedCategories = await Promise.all(
    categories.map(category =>
      CategoryModel.query().insert({ id: uuid(), tyyppi: category })
    )
  );
  console.log('insertedCategories', insertedCategories.length);

  const insertedProducts = await Promise.all(
    products.map(product =>
      ProductModel.query().insert({
        ...product
      })
    )
  );
  console.log('insertedProducts', insertedProducts.length);

  knex.destroy();
  process.exit();
};

runImport();
