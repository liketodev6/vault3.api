import { Priceing } from "../../../../model/priceing";
import StorageHelper from '../../../../helpers/storage';

export interface IDefaultPriceing {
  step: number;
  price: number;
};

export class PriceingResModel {
  constructor(list: Priceing[]) {
    this.priceingList = list;
  };
  public priceingList: Priceing[];
  public default: IDefaultPriceing = {
    step: StorageHelper.parceFromKbToGb(5),
    price: 1
  };
};