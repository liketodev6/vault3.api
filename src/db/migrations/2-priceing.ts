import { Knex } from "knex";
import { schemaReferences, currencies } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(schemaReferences.priceings, (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary();
    table.string("mask").notNullable();
    table.bigint("value").notNullable();
    table.integer("cost").notNullable();
    table.enu("currency", currencies).notNullable();
    table.date("createdDt").notNullable();
    table.date("updatedDt").nullable();
    table.boolean("isActive").notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(schemaReferences.priceings);
};