import xlsx from 'xlsx';
import axios from 'axios';

import { alkoHeaders, alkoUrl } from './constants';

export const chunk = (array, size) => {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
};

export const capitalizeFirstChar = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getProducts = async () => {
  const buffer = await axios.get(alkoUrl, {
    responseType: 'arraybuffer',
  });

  const data = new Uint8Array(buffer.data);

  const workBook = xlsx.read(data, { type: 'array' });

  const products = xlsx.utils.sheet_to_json(
    workBook.Sheets[workBook.SheetNames[0]],
    { header: alkoHeaders },
  );

  const headersRemoved = products.slice(3);

  return headersRemoved;
};

export const getFileNumber = fileIndex => fileIndex.toString().padStart(6, '0');

export default {
  chunk,
  capitalizeFirstChar,
  getProducts,
  getFileNumber,
};
