import { Model } from 'objection';

class Category extends Model {
  static get tableName(): string {
    return 'category';
  }
}

export default Category;
