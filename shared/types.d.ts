export type AllCategoriesUUID = "93976e57-7d96-40c3-8860-8ffcc76b233d";

export type SortOrder = "ASC" | "DESC";

export interface UnsanitizedProduct {
  id: string;
  nimi: string;
  valmistaja: string;
  pullokoko: string | undefined;
  hinta: string;
  litrahinta: string | undefined;
  uutuus: string;
  hinnastojarjestys: string;
  tyyppi: string;
  erityisryhma: string | undefined;
  oluttyyppi: string | undefined;
  valmistusmaa: string;
  alue: string;
  vuosikerta: string | undefined;
  etikettimerkintoja: string;
  huomautus: string;
  rypaleet: string;
  luonnehdinta: string;
  pakkaustyyppi: string | undefined;
  suljentatyyppi: string | undefined;
  alkoholiprosentti: string | undefined;
  hapot: string | undefined;
  sokeri: string | undefined;
  kantavierreprosentti: string | undefined;
  vari: string;
  katkerot: string;
  energia: string | undefined;
  valikoima: string | undefined;
}

export interface Product {
  id: string;
  nimi: string;
  valmistaja: string;
  pullokoko: number | undefined;
  alkoholilitrahinta: number | undefined;
  hinta: number;
  litrahinta: number | undefined;
  uutuus: string;
  hinnastojarjestys: string;
  tyyppiId: string | undefined;
  erityisryhma: string | undefined;
  oluttyyppi: string | undefined;
  valmistusmaa: string;
  alue: string;
  vuosikerta: number | undefined;
  etikettimerkintoja: string;
  huomautus: string;
  rypaleet: string;
  luonnehdinta: string;
  pakkaustyyppi: string | undefined;
  suljentatyyppi: string | undefined;
  alkoholiprosentti: number | undefined;
  hapot: number | undefined;
  sokeri: number | undefined;
  kantavierreprosentti: number | undefined;
  vari: string;
  katkerot: string;
  energia: number | undefined;
  valikoima: string | undefined;
}

export interface Category {
  id: string;
  tyyppi: string;
}
