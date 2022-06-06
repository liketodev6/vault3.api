import { Knex } from "knex";
import { schemaReferences } from '../../constants';
import { currencies } from "../../constants";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(schemaReferences.transactions, (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary();
    table.integer("user").references(schemaReferences.user);
    table.integer('storage').references(schemaReferences.storages);
    table.double('cost').notNullable();
    table.enum('currency', currencies).defaultTo('eth');
    table.date("createdDt").notNullable().defaultTo(knex.fn.now());
    table.date("updatedDt").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(schemaReferences.transactions);
};