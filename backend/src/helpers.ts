import xlsx from 'xlsx';
import fetch from 'node-fetch';

import { alkoHeaders, alkoUrl } from './constants';
import { UnsanitizedProduct, Product } from '../../shared/types';

export const capitalizeFirstChar = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// FIXME: add tests back again

export const getProducts = async (): Promise<UnsanitizedProduct[]> => {
  const response = await fetch(alkoUrl);
  const buffer: ArrayBuffer = await response.arrayBuffer();

  const data = new Uint8Array(buffer);

  const workBook = xlsx.read(data, { type: 'array' });

  const products: UnsanitizedProduct[] = xlsx.utils.sheet_to_json(
    workBook.Sheets[workBook.SheetNames[0]],
    { header: alkoHeaders }
  );

  const headersRemoved = products.slice(3);

  return headersRemoved;
};

export const sanitizeProduct = (product: UnsanitizedProduct): Product => {
  // FIXME: check all field in more detail

  const hinta = Number(product.hinta);
  let pullokoko: number | undefined = undefined;
  let alkoholiprosentti: number | undefined = undefined;
  let alkoholimaara: number | undefined = undefined;
  let alkoholilitrahinta: number | undefined = undefined;

  if (product.pullokoko && product.alkoholiprosentti) {
    pullokoko = Number(product.pullokoko.replace(' l', '').replace(',', '.'));
    alkoholiprosentti = Number(product.alkoholiprosentti);
    alkoholimaara = (pullokoko * alkoholiprosentti) / 100;
    if (alkoholimaara > 0) {
      alkoholilitrahinta = Math.round((hinta / alkoholimaara) * 100) / 100;
    }
  }

  return {
    ...product,
    hinta,
    pullokoko,
    alkoholiprosentti,
    alkoholilitrahinta,
    tyyppi: product.tyyppi
      ? capitalizeFirstChar(product.tyyppi)
      : 'Määrittelemättömät',
    pakkaustyyppi: product.pakkaustyyppi
      ? capitalizeFirstChar(product.pakkaustyyppi)
      : undefined,
    suljentatyyppi: product.suljentatyyppi
      ? capitalizeFirstChar(product.suljentatyyppi)
      : undefined,
    valikoima: product.valikoima
      ? capitalizeFirstChar(product.valikoima)
      : undefined,
    oluttyyppi: product.oluttyyppi
      ? capitalizeFirstChar(product.oluttyyppi)
      : undefined,
    erityisryhma: product.erityisryhma
      ? capitalizeFirstChar(product.erityisryhma)
      : undefined,
    hapot: product.hapot ? Number(product.hapot) : undefined,
    sokeri: product.sokeri ? Number(product.sokeri) : undefined,
    energia: product.energia ? Number(product.energia) : undefined,
    vuosikerta: product.vuosikerta ? Number(product.vuosikerta) : undefined,
    litrahinta: product.litrahinta ? Number(product.litrahinta) : undefined,
    kantavierreprosentti: product.kantavierreprosentti
      ? Number(product.kantavierreprosentti)
      : undefined,
  };
};

export default {
  capitalizeFirstChar,
  getProducts,
};
