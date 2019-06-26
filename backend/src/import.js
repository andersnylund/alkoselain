import fs from 'fs';
import uuid from 'uuid/v4';

import './env';
import { prisma } from './generated/prisma-client';
import {
  capitalizeFirstChar,
  chunk,
  getProducts,
  getFileNumber,
} from './helpers';

const run = async () => {
  await prisma.deleteManyProducts();
  await prisma.deleteManyCategories();

  const products = await getProducts();

  const sanitizedProducts = products.map(p => {
    const product = Object.assign({}, p);
    // eslint-disable-next-line dot-notation
    product['_typeName'] = 'Product';
    if (product.tyyppi) {
      product.tyyppi = undefined;
    }
    if (product.pullokoko) {
      product.pullokoko = Number(
        product.pullokoko.replace(' l', '').replace(',', '.'),
      );
      const alcoholAmount =
        (product.pullokoko * product.alkoholiprosentti) / 100;
      if (alcoholAmount > 0) {
        const alcoholLiterPrice =
          Math.round((product.hinta / alcoholAmount) * 100) / 100;
        product.alkoholilitrahinta = alcoholLiterPrice;
      } else {
        product.alkoholilitrahinta = undefined;
      }
    }
    if (product.pakkaustyyppi) {
      product.pakkaustyyppi = capitalizeFirstChar(product.pakkaustyyppi);
    }
    if (product.suljentatyyppi) {
      product.suljentatyyppi = capitalizeFirstChar(product.suljentatyyppi);
    }
    if (product.valikoima) {
      product.valikoima = capitalizeFirstChar(product.valikoima);
    }
    if (product.oluttyyppi) {
      product.oluttyyppi = capitalizeFirstChar(product.oluttyyppi);
    }
    if (product.erityisryhma) {
      product.erityisryhma = capitalizeFirstChar(product.erityisryhma);
    }
    if (product.alkoholiprosentti) {
      product.alkoholiprosentti = Number(product.alkoholiprosentti);
    }
    if (product.hapot) {
      product.hapot = Number(product.hapot);
    } else {
      product.hapot = 0;
    }
    if (product.sokeri) {
      product.sokeri = Number(product.sokeri);
    } else {
      product.sokeri = 0;
    }
    if (product.energia) {
      product.energia = Number(product.energia);
    } else {
      product.energia = 0;
    }
    if (product.vuosikerta) {
      product.vuosikerta = Number(product.vuosikerta);
    }
    if (product.hinta) {
      product.hinta = Number(product.hinta);
    }
    if (product.litrahinta) {
      product.litrahinta = Number(product.litrahinta);
    }
    if (product.kantavierreprosentti) {
      product.kantavierreprosentti = Number(product.kantavierreprosentti);
    } else {
      product.kantavierreprosentti = 0;
    }
    return product;
  });

  const categorySet = new Set(
    products
      .filter(p => p.tyyppi !== undefined)
      .filter(p => p.tyyppi !== 'Tyyppi')
      .map(p => capitalizeFirstChar(p.tyyppi)),
  );

  const categoriesArray = [...categorySet].map(tyyppi => ({
    _typeName: 'Category',
    id: uuid(),
    tyyppi,
  }));

  const categories = {
    valueType: 'nodes',
    values: categoriesArray,
  };

  const chunked = chunk(sanitizedProducts, 1000);

  let fileIndex = 1;

  chunked.forEach(async dataChunck => {
    const dataObject = {};
    dataObject.valueType = 'nodes';
    dataObject.values = dataChunck;

    const fileNumber = getFileNumber(fileIndex);
    fileIndex += 1;

    await fs.writeFile(
      `./data/nodes/${fileNumber}.json`,
      JSON.stringify(dataObject),
      () => {},
    );

    const relationObject = {
      valueType: 'relations',
      values: [],
    };

    dataChunck.forEach(product => {
      const { tyyppi } = products.find(p => p.id === product.id);

      if (tyyppi !== undefined && tyyppi !== null) {
        const capitalizedTyyppi = capitalizeFirstChar(tyyppi);

        const categoryId = categoriesArray.find(
          c => c.tyyppi === capitalizedTyyppi,
        ).id;

        const relation = [
          { _typeName: 'Product', id: product.id, fieldName: 'tyyppi' },
          { _typeName: 'Category', id: categoryId, fieldName: 'products' },
        ];
        relationObject.values = [...relationObject.values, relation];
      }
    });

    await fs.writeFile(
      `./data/relations/${fileNumber}.json`,
      JSON.stringify(relationObject),
      () => {},
    );
  });

  fileIndex += 1;
  const fileNumber = getFileNumber(fileIndex);

  await fs.writeFile(
    `./data/nodes/${fileNumber}.json`,
    JSON.stringify(categories),
    () => {},
  );
};

run();
