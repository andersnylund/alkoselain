import xlsx from 'xlsx';
import axios from 'axios';

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

    const sheet = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]], { header: alkoHeaders });
    console.log('workBook.SheetNames:', workBook.SheetNames)

    console.log('sheet:', sheet)


}

toJSON();