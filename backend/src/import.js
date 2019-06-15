import xlsx from 'xlsx';
import axios from 'axios';
import fs from 'fs';

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

  const sanitized = headersRemoved.map(p => {
    const product = Object.assign({}, p);
    // eslint-disable-next-line dot-notation
    product['_typeName'] = 'Product';
    if (product.tyyppi) {
      product.tyyppi = capitalizeFirstChar(product.tyyppi);
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

  const chunked = chunk(sanitized, 1000);

  chunked.forEach(async (dataChunck, i) => {
    const dataObject = {};
    dataObject.valueType = 'nodes';
    dataObject.values = dataChunck;

    await fs.writeFile(
      `./data/nodes/0${i + 1}.json`,
      JSON.stringify(dataObject),
      () => {},
    );
  });
};

run();
