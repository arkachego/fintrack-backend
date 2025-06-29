// Libraries
import type { Knex } from "knex";

// Constants
import { TABLE_NAME } from "../../constants/table-names";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME.USER, (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('type_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.USER_TYPE);
    table
      .string('name', 50)
      .notNullable();
    table
      .string('email', 100)
      .notNullable()
      .unique();
    table
      .string("password", 60)
      .notNullable();
    table
      .timestamp('joined_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME.USER);
};
