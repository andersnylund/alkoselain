import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product', (table: Knex.TableBuilder) => {
    table
      .text('id')
      .unique()
      .notNullable();
    table.text('nimi');
    table.text('valmistaja');
    table.float('pullokoko');
    table.float('alkoholilitrahinta');
    table.float('hinta');
    table.float('litrahinta');
    table.text('uutuus');
    table.text('hinnastojarjestys');
    table.text('erityisryhma');
    table.text('oluttyyppi');
    table.text('valmistusmaa');
    table.text('alue');
    table.integer('vuosikerta');
    table.text('etikettimerkintoja');
    table.text('huomautus');
    table.text('rypaleet');
    table.text('luonnehdinta');
    table.text('pakkaustyyppi');
    table.text('suljentatyyppi');
    table.float('alkoholiprosentti');
    table.float('hapot');
    table.float('sokeri');
    table.float('kantavierreprosentti');
    table.text('vari');
    table.text('katkerot');
    table.float('energia');
    table.text('valikoima');

    table
      .text('tyyppi')
      .references('tyyppi')
      .inTable('category')
      .notNullable()
      .onDelete('cascade');

    table.index('id');
    table.index('tyyppi');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('product');
}
