import xlsx from "xlsx";
import axios from "axios";
import { prisma } from "../generated/prisma-client";
import fs from "fs";

const chunk = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

const toJSON = async () => {
  const alkoHeaders = [
    "id",
    "nimi",
    "valmistaja",
    "pullokoko",
    "hinta",
    "litrahinta",
    "uutuus",
    "hinnastojarjestys",
    "tyyppi",
    "erityisryhma",
    "oluttyyppi",
    "valmistusmaa",
    "alue",
    "vuosikerta",
    "etikettimerkintoja",
    "huomautus",
    "rypaleet",
    "luonnehdinta",
    "pakkaustyyppi",
    "suljentatyyppi",
    "alkoholiprosentti",
    "hapot",
    "sokeri",
    "kantavierreprosentti",
    "vari",
    "katkerot",
    "energia",
    "valikoima"
  ];

  const url =
    "https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xls";

  const buffer = await axios.get(url, {
    responseType: "arraybuffer"
  });

  const data = new Uint8Array(buffer.data);

  const workBook = xlsx.read(data, { type: "array" });

  const products = xlsx.utils.sheet_to_json(
    workBook.Sheets[workBook.SheetNames[0]],
    { header: alkoHeaders }
  );

  const headersRemoved = products.slice(3);

  headersRemoved.forEach(async product => {
    product["_typeName"] = "Product";
    if (product["pullokoko"]) {
      product["pullokoko"] = product["pullokoko"]
        .replace(" l", "")
        .replace(",", ".");
      const alcoholAmount =
        Number(product["pullokoko"]) *
        Number(product["alkoholiprosentti"] / 100);
      if (alcoholAmount > 0) {
        const alcoholLiterPrice = product["hinta"] / alcoholAmount;
        product["alkoholilitrahinta"] =  alcoholLiterPrice;
      } else {
        product["alkoholilitrahinta"] = 9999;
      }   
    }
  });

  const chunked = chunk(headersRemoved, 1000);

  chunked.forEach(async (chunk, i) => {
    const data = {};
    data.valueType = "nodes";
    data.values = chunk;

    await fs.writeFile(`./data/nodes/0${i+1}.json`, JSON.stringify(data), () => {
      console.log(`written chunk ${i+1}`);
    });
  });
};

toJSON();
