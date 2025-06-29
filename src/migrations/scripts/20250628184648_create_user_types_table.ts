// Libraries
import type { Knex } from "knex";

// Constants
import { TABLE_NAME } from "../../constants/table-names";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME.USER_TYPE, (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table
      .string('name', 20)
      .notNullable();
  });
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME.USER_TYPE);
};
