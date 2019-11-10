import { Model } from 'objection';

import Product from './product';
import { Category as CategoryType } from '../../../shared/types';

export default class Category extends Model implements CategoryType {
  id!: string;
  tyyppi!: string;

  static tableName = 'category';

  static relationMappings = {
    products: {
      relation: Model.HasManyRelation,
      modelClass: Product,
      join: {
        from: 'category.tyyppi',
        to: 'product.tyyppi'
      }
    }
  };
}
