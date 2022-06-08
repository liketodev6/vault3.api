import { Knex } from "knex";
import { schemaReferences } from '../../constants';
import { FileTypeEnum } from "../../constants/enums";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(schemaReferences.files, (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary();
    table.integer("pid").references(schemaReferences.files);
    table.integer("storage").references(schemaReferences.storages);
    table.enum('type', [FileTypeEnum.file, FileTypeEnum.folder]).notNullable();
    table.string("name").notNullable();
    table.string("extension").nullable();
    table.string("originalName").nullable();
    table.string("maskName").nullable();
    table.bigint("size").notNullable().defaultTo(0);
    table.integer("downloadCount").notNullable().defaultTo(0);
    table.integer("viewedCount").notNullable().defaultTo(0);
    table.date("createdDt").notNullable().defaultTo(knex.fn.now());
    table.date("updatedDt").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(schemaReferences.files);
};