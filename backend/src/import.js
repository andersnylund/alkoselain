import xlsx from 'xlsx';
import axios from 'axios';
import fs from 'fs';
import uuid from 'uuid/v4';

import './env';
import { prisma } from './generated/prisma-client';

const chunk = (array, size) => {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
};

const capitalizeFirstChar = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const run = async () => {
  await prisma.deleteManyProducts({
    id_not: '',
  });

  await prisma.deleteManyCategories({
    id_not: uuid(),
  });

  const alkoHeaders = [
    'id',
    'nimi',
    'valmistaja',
    'pullokoko',
    'hinta',
    'litrahinta',
    'uutuus',
    'hinnastojarjestys',
    'tyyppi',
    'erityisryhma',
    'oluttyyppi',
    'valmistusmaa',
    'alue',
    'vuosikerta',
    'etikettimerkintoja',
    'huomautus',
    'rypaleet',
    'luonnehdinta',
    'pakkaustyyppi',
    'suljentatyyppi',
    'alkoholiprosentti',
    'hapot',
    'sokeri',
    'kantavierreprosentti',
    'vari',
    'katkerot',
    'energia',
    'valikoima',
  ];

  const url =
    'https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xls';

  const buffer = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const data = new Uint8Array(buffer.data);

  const workBook = xlsx.read(data, { type: 'array' });

  const products = xlsx.utils.sheet_to_json(
    workBook.Sheets[workBook.SheetNames[0]],
    { header: alkoHeaders },
  );

  const headersRemoved = products.slice(3);

  const sanitizedProducts = headersRemoved.map(p => {
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
    if (product.alkoholiprosentti) {
      product.alkoholiprosentti = Number(product.alkoholiprosentti);
    }
    if (product.hapot) {
      product.hapot = Number(product.hapot);
    }
    if (product.energia) {
      product.energia = Number(product.energia);
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

  await fs.writeFile(
    './data/nodes/010.json',
    JSON.stringify(categories),
    () => {},
  );

  const chunked = chunk(sanitizedProducts, 1000);

  chunked.forEach(async (dataChunck, i) => {
    const dataObject = {};
    dataObject.valueType = 'nodes';
    dataObject.values = dataChunck;

    await fs.writeFile(
      `./data/nodes/00${i + 1}.json`,
      JSON.stringify(dataObject),
      () => {},
    );

    const relationObject = {
      valueType: 'relations',
      values: [],
    };

    dataChunck.forEach(product => {
      const { tyyppi } = headersRemoved.find(p => p.id === product.id);

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
      `./data/relations/00${i + 1}.json`,
      JSON.stringify(relationObject),
      () => {},
    );
  });
};

run();
