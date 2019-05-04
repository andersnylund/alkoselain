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
  await prisma.deleteManyProducts({
    numero_not: ""
  });

  const alkoHeaders = [
    "numero",
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
    if (product["pullokoko"]) {
      product["pullokoko"] = product["pullokoko"]
        .replace(" l", "")
        .replace(",", ".");
      const alcoholAmount =
        Number(product["pullokoko"]) *
        Number(product["alkoholiprosentti"] / 100);
      const alcoholLiterPrice = product["hinta"] / alcoholAmount;
      product["alkoholilitrahinta"] = alcoholLiterPrice;
    }

    //     try {
    //       await prisma.createProduct({
    //         numero: product["numero"],
    //         nimi: product["nimi"],
    //         valmistaja: product["valmistaja"],
    //         pullokoko: product["pullokoko"],
    //         hinta: product["hinta"],
    //         litrahinta: product["litrahinta"],
    //         uutuus: product["uutuus"],
    //         hinnastojarjestyskoodi: product["hinnastojarjestyskoodi"],
    //         tyyppi: product["tyyppi"],
    //         erityisryhma: product["erityisryhma"],
    //         oluttyyppi: product["oluttyyppi"],
    //         valmistusmaa: product["valmistusmaa"],
    //         alue: product["alue"],
    //         vuosikerta: product["vuosikerta"],
    //         etikettimerkintoja: product["etikettimerkintoja"],
    //         huomautus: product["huomautus"],
    //         rypaleet: product["rypaleet"],
    //         luonnehdinta: product["luonnehdinta"],
    //         pakkaustyyppi: product["pakkaustyyppi"],
    //         suljentatyppi: product["suljentatyppi"],
    //         alkoholiprosentti: product["alkoholiprosentti"],
    //         hapot: product["hapot"],
    //         sokeri: product["sokeri"],
    //         kantavierreprosentti: product["kantavierreprosentti"],
    //         vari: product["vari"],
    //         ebc: product["ebc"],
    //         katkerot: product["katkerot"],
    //         ebu: product["ebu"],
    //         energia: product["energia"],
    //         valikoima: product["valikoima"],
    //         alkoholilitrahinta: product["alkoholilitrahinta"]
    //       });
    //     } catch (e) {
    //       console.log(e);
    //       console.log(product);
    //     }
  });

  const chunked = chunk(headersRemoved, 1000);

  chunked.forEach(async (chunk, i) => {
    const data = {};
    data.valueType = 'nodes';
    data.values = chunk;

    await fs.writeFile(`./data/nodes/${i}.json`, JSON.stringify(data), () => {
      console.log(`written chunk ${i}`);
    });
  });

  
};

toJSON();
