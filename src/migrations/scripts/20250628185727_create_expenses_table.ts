// Libraries
import type { Knex } from "knex";

// Constants
import { TABLE_NAME } from "../../constants/table-names";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME.EXPENSE, (table) => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('team_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.TEAM);
    table
      .uuid('requestor_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.USER);
    table
      .uuid('approver_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.USER);
    table
      .uuid('type_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.EXPENSE_TYPE);
    table
      .uuid('status_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.EXPENSE_STATUS);
    table
      .string('name', 50)
      .notNullable();
    table
      .string('details', 250)
      .defaultTo(null);
    table
      .decimal('amount', 10, 2)
      .notNullable();
    table
      .string('attachment', 200)
      .defaultTo(null);
    table
      .timestamp('spent_at', { useTz: true })
      .notNullable();
    table
      .timestamp('requested_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('approved_at', { useTz: true })
      .defaultTo(null);
    table
      .timestamp('rejected_at', { useTz: true })
      .defaultTo(null);
  });
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME.EXPENSE);
};
