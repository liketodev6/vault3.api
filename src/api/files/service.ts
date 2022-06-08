import { inject } from "inversify";
import { myContainer } from "../../dependency/inversify.config";
import { TYPES } from "../../dependency/inversify.types";
import IFileManager from "../../managers/file";
import IStorageManager from "../../managers/storage";
import { User } from "../../model/user";
import { getResponse, IResponseModel } from "../mainModels";
import { CreateFolderReqModel } from "./model/req/createFolder";

class FilesService {

  constructor (
    @inject(TYPES.fileManager) private FileManager: IFileManager,
    @inject(TYPES.storageManager) private StorageManager: IStorageManager
  ) {};

  public createFolder = async (user: User, body: CreateFolderReqModel): Promise<IResponseModel<null>> => {
    const storage = await this.StorageManager.findByUserId(user.id);
    const result = await this.FileManager.createFolder(body.name, body.parentId, storage);
    return getResponse(result.success, result.message);
  };

};

export default new FilesService(
  myContainer.get<IFileManager>(TYPES.fileManager),
  myContainer.get<IStorageManager>(TYPES.storageManager)
);