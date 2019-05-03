import xlsx from 'xlsx';
import axios from 'axios';
import fs from 'fs';

const toJSON = async () => {
    const alkoHeaders = ['nro', 'nimi', 'valmistaja', 'pullokoko', 'hinta', 'litrahinta',
    'uutuus', 'hinnastojärjestys', 'tyyppi', 'erityisryhmä', 'oluttyyppi',
    'valmistusmaa', 'alue', 'vuosikerta', 'etikettimerkintöjä', 'huomautus',
    'rypäleet', 'luonnehdinta', 'pakkaustyyppi', 'suljentatyyppi', 'alkoholi-%',
    'hapot g/l', 'sokeri g/l', 'kantavierrep-%', 'väri', 'katkerot', 'energia', 'valikoima', 'pvm', '_id'];
    
    const url = 'https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xls';

    const buffer = await axios.get(url, {
        responseType: 'arraybuffer'
    });

    const data = new Uint8Array(buffer.data);

    const workBook = xlsx.read(data, { type: 'array'});

    const products = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]], { header: alkoHeaders });

    const filtered = products.filter(product => !!product['pullokoko']);

    const halpaa = filtered.map(product => {
        if (product['pullokoko']) {
            product['pullokoko'] = product['pullokoko'].replace(' l', '').replace(',', '.');
            const alcoholAmount = Number(product['pullokoko']) * (Number(product['alkoholi-%'] / 100));
            const alcoholLiterPrice = product['hinta'] / alcoholAmount;
            product['alkoholi-litrahinta'] = alcoholLiterPrice;
        }
        return product;
    })

    fs.writeFile('halpaa.json', JSON.stringify(halpaa), 'utf8', () => {
        console.log('written');
    });

}

toJSON();