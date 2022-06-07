import { injectable } from "inversify";
import { FileRepository } from "../repository/file";


@injectable()
export class FileManager implements IFileManager {

  private get FileRepo() {
      return new FileRepository();
  };

};

export default interface IFileManager {

};