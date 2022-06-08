import knex, { Knex } from "knex";
import mainConfig from "../env";
import config from "./knexfile";

export default knex({
  client: "pg",
  connection: {
    database: "vault3",
    user: "postgres",
    password: "1111"
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
});
