import xlsx from 'xlsx';

const toJSON = async () => {
    const products = xlsx.utils.sheet_to_json('')

    const products = await csv({
        delimiter: ';'
    }).fromFile('alkon-hinnasto-tekstitiedostona.csv');

    products.forEach(product => {
        product['Pullokoko'] = product['Pullokoko'].replace(' l', '').replace(',', '.');
    });

    console.log(products);
}

toJSON();