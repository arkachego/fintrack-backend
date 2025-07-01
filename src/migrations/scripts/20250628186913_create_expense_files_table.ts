// Libraries
import type { Knex } from "knex";

// Constants
import { TABLE_NAME } from "../../constants/table-names";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME.EXPENSE_FILE, (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('expense_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.EXPENSE);
    table
      .string('name', 100)
      .notNullable();
    table
      .string('type', 50)
      .notNullable();
    table
      .string('key', 200)
      .notNullable();
  });
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME.EXPENSE_FILE);
};
