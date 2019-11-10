import { Model } from 'objection';

export class Category extends Model {
  id!: string;
  name!: string;

  static get tableName(): string {
    return 'category';
  }
}
