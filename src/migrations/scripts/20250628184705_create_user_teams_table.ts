// Libraries
import type { Knex } from "knex";

// Constants
import { TABLE_NAME } from "../../constants/table-names";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME.USER_TEAM, (table) => {
    table
      .uuid('team_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.TEAM);
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable(TABLE_NAME.USER);
    table.unique([
      'team_id',
      'user_id',
    ]);
  });
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLE_NAME.USER_TEAM);
};
