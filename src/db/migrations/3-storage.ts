import { Knex } from "knex";
import { schemaReferences } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(schemaReferences.storages, (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary();
    table.integer("user").references(schemaReferences.user);
    table.bigint('totalSize').notNullable();
    table.bigint('usedSize').notNullable().defaultTo(0);
    table.bigint('availableSize').notNullable().defaultTo(0);
    table.string('directory').nullable().defaultTo(null);
    table.date('activeAt').defaultTo(knex.fn.now()).notNullable();
    table.date('expireDt').notNullable();
    table.date("createdDt").notNullable().defaultTo(knex.fn.now());
    table.date("updatedDt").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(schemaReferences.storages);
};