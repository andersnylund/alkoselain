import Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('category', (table: Knex.TableBuilder) => {
    table.uuid('id');
    table.text('name');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('category');
}
