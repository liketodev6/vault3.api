import { inject } from "inversify";
import { myContainer } from "../../dependency/inversify.config";
import { TYPES } from "../../dependency/inversify.types";
import IPriceingManager from "../../managers/priceing";
import { Priceing } from "../../model/priceing";
import { getResponse, IResponseModel } from "../mainModels";
import { PriceingResModel } from "./model/res/priceingResModel";

class StorageService {

  constructor(
    @inject(TYPES.priceingManager) private PriceingMamager: IPriceingManager
  ) {};

  public getList = async (): Promise<IResponseModel<PriceingResModel>> => {
    const list = await this.PriceingMamager.getList();
    const response = new PriceingResModel(list);
    return getResponse(true, 'priceing list', response);
  };
};

export default new StorageService(
  myContainer.get<IPriceingManager>(TYPES.priceingManager)
);
