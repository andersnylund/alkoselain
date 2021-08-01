import { Model } from 'objection';
import Knex from 'knex';
import uuid from 'uuid/v4';
import dotenv from 'dotenv';
dotenv.config();

import { getProducts, sanitizeProduct, capitalizeFirstChar } from './helpers';
import { UnsanitizedProduct, Product } from '../../shared/types';
import CategoryModel from './models/category';
import ProductModel from './models/product';
import knexConfig from '../knexfile';

const knex = Knex(knexConfig);
Model.knex(knex);

const runImport = async (): Promise<void> => {
  try {
    const deletedCategories = await CategoryModel.query().delete();
    console.log('deletedCategories', deletedCategories);
    const deletedProducts = await ProductModel.query().delete();
    console.log('deletedProducts', deletedProducts);

    const unzanitisedProducts: UnsanitizedProduct[] = await getProducts();
    const categories: string[] = Array.from(
      new Set(
        unzanitisedProducts
          .filter((p) => p.tyyppi !== undefined)
          .map((p) => capitalizeFirstChar(p.tyyppi))
      )
    );

    const insertedCategories: CategoryModel[] = await Promise.all(
      categories.map((category) =>
        CategoryModel.query().insert({ id: uuid(), tyyppi: category })
      )
    );
    console.log('insertedCategories', insertedCategories.length);

    const products: Product[] = unzanitisedProducts.map((p) =>
      sanitizeProduct(p, insertedCategories)
    );

    const insertedProducts = await Promise.all(
      products.map((product) =>
        ProductModel.query().insert({
          ...product,
        })
      )
    );
    console.log('insertedProducts', insertedProducts.length);
    process.exit();
  } catch (e) {
    console.log('e', e);
    process.exit(1);
  } finally {
    knex.destroy();
  }
};

runImport();
