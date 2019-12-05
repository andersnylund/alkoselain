import { ALL_CATEGORIES_UUID } from '../../shared/types';

const allCategoriesId: ALL_CATEGORIES_UUID = '93976e57-7d96-40c3-8860-8ffcc76b233d';

export const filterableFields = [
  { key: 'alkoholilitrahinta', value: 'Alkoholin litrahinta' },
  { key: 'hinta', value: 'Hinta' },
  { key: 'litrahinta', value: 'Litrahinta' },
  { key: 'pullokoko', value: 'Pullon koko' },
  { key: 'nimi', value: 'Nimi' },
  { key: 'alkoholiprosentti', value: 'Alkoholiprosentti' },
];

export const allCategories = {
  key: allCategoriesId,
  text: 'Kaikki juomatyypit',
  value: allCategoriesId,
};

export default {
  filterableFields,
};
