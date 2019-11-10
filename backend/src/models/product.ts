import { Model } from 'objection';
import Category from './category';

import { Product as ProductType } from '../../../shared/types';

export default class Product extends Model implements ProductType {
  id!: string;
  nimi!: string;
  valmistaja!: string;
  pullokoko: number | undefined;
  alkoholilitrahinta: number | undefined;
  hinta!: number;
  litrahinta: number | undefined;
  uutuus!: string;
  hinnastojarjestys!: string;
  tyyppi!: string;
  erityisryhma: string | undefined;
  oluttyyppi: string | undefined;
  valmistusmaa!: string;
  alue!: string;
  vuosikerta: number | undefined;
  etikettimerkintoja!: string;
  huomautus!: string;
  rypaleet!: string;
  luonnehdinta!: string;
  pakkaustyyppi: string | undefined;
  suljentatyyppi: string | undefined;
  alkoholiprosentti: number | undefined;
  hapot: number | undefined;
  sokeri: number | undefined;
  kantavierreprosentti: number | undefined;
  vari!: string;
  katkerot!: string;
  energia: number | undefined;
  valikoima: string | undefined;

  static tableName = 'product';

  static relationMappings = {
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: Category,
      join: {
        from: 'product.tyyppi',
        to: 'category.tyyppi',
      },
    },
  };
}
