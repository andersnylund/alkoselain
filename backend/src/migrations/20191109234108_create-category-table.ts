import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('category', (table: Knex.TableBuilder) => {
    table
      .uuid('id')
      .unique()
      .notNullable();
    table
      .text('tyyppi')
      .unique()
      .notNullable();

    table.index('id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('category');
}
