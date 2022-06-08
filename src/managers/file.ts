import { injectable } from "inversify";
import { FileRepository } from "../repository/file";
import { Storage } from '../model/storage';

@injectable()
export class FileManager implements IFileManager {

  private get FileRepo() {
    return new FileRepository();
  };

  public createStorageRootDirectory = async (name: string) => {
    return await this.FileRepo.createRootDirectory(name);
  };

  public createFolder = async (name: string, pid: number, storage: Storage<number>) => {
    return await this.FileRepo.createFolder(name, pid, storage)
  }

};

export default interface IFileManager {
  createStorageRootDirectory: (name: string) => Promise<{ success: boolean, message: string }>;
  createFolder: (name: string, pid: number, storage: Storage<number>) => Promise<{ success: boolean, message: string }>;
};