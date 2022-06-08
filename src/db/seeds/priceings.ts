import { Knex } from "knex";
import { Priceing } from "../../model/priceing";
import { currencies, schemaReferences } from "../../constants";
import StorageHelper from '../../helpers/storage';

export const currency: string = "btc";

const priceings: Priceing[] = [
  {
    mask: "25GB",
    value: StorageHelper.parceFromKbToGb(25),
    cost: 10,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "200GB",
    value: StorageHelper.parceFromKbToGb(200),
    cost: 11,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "400GB",
    value: StorageHelper.parceFromKbToGb(400),
    cost: 12,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "600GB",
    value: StorageHelper.parceFromKbToGb(600),
    cost: 13,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "800GB",
    value: StorageHelper.parceFromKbToGb(800),
    cost: 14,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "1TB",
    value: StorageHelper.parceFromKbToGb(1024),
    cost: 15,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "1200GB",
    value: StorageHelper.parceFromKbToGb(1200),
    cost: 16,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "1400GB",
    value: StorageHelper.parceFromKbToGb(1400),
    cost: 17,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "1600GB",
    value: StorageHelper.parceFromKbToGb(1600),
    cost: 18,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "1800GB",
    value: StorageHelper.parceFromKbToGb(1800),
    cost: 19,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  },
  {
    mask: "2TB",
    value: StorageHelper.parceFromKbToGb(2048),
    cost: 20,
    currency: currency,
    createdDt: new Date(),
    updatedDt: null,
    isActive: true
  }
];

export async function seed(knex: Knex): Promise<void> {
  await knex(schemaReferences.priceings).truncate();
  await knex(schemaReferences.priceings).insert(priceings);
}