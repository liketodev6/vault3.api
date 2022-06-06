import { injectable } from "inversify";
import { Priceing } from "../model/priceing";
import db from '../db/db';
import { schemaReferences } from "../constants";


@injectable()
export class PriceingManager implements IPriceingManager {
    public getList = async () => {
      return await db.from(schemaReferences.priceings);
    };
};

export default interface IPriceingManager {
  getList: () => Promise<Priceing[]>;
};