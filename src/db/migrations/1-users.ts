import { Knex } from "knex";
import { schemaReferences } from '../../constants';
import { StoragePaymentStatusEnum, UserActivityStatusEnum } from "../../constants/enums";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(schemaReferences.user, (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").notNullable();
    table.date("createdDt").notNullable();
    table.date("updatedDt").nullable();
    table.date("logoutAt").nullable();
    table.boolean("isLoggedId").notNullable().defaultTo(false);
    table.enum('activityStatus', [UserActivityStatusEnum.acitve, UserActivityStatusEnum.inActive]).defaultTo(UserActivityStatusEnum.acitve);
    table.enum('storagePaymentStatus', [StoragePaymentStatusEnum.expired, StoragePaymentStatusEnum.payed]).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(schemaReferences.user);
};