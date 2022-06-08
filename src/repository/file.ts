import * as fs from 'fs';
import { defaultStorageDirectory, schemaReferences } from '../constants';
import { FileTypeEnum } from '../constants/enums';
import db from '../db/db';
import { Files } from '../model/file';
import { Storage } from '../model/storage';
import { filesMaxLayerCount } from '../constants';
import StorageHelper from '../helpers/storage';
import { reverseStr } from '../helpers';
export class FileRepository {

  private errorResponse = { success: false, message: 'error' };

  private successResponse = { success: true, message: 'ok' };


  public createRootDirectory = async (name: string): Promise<{ success: boolean, message: string }> => {
    const dir = defaultStorageDirectory + '/' + name;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(dir+'/'+'trash');
    }

    return this.successResponse;
  };

  public createFolder = async (name: string, pid: number, storage: Storage<number>) => {
    const item = await this.getFileParentListTree(pid);
    if (!item.success) {
      this.errorResponse.message = 'Maximum size of folders tree';
      return this.errorResponse;
    }

    const path = defaultStorageDirectory + '/' + StorageHelper.generateStorageDirectory(storage.user, storage.id) + item.message + `/${name}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      const folderModel: Files<number, number> = {
        pid,
        storage: storage.id,
        type: FileTypeEnum.folder,
        name,
        originalName: name,
        maskName: name
      };

      await db.insert(folderModel).from(schemaReferences.files);
      return this.successResponse;
    } else {
      this.errorResponse.message = 'folder with given name already exists';
      return this.errorResponse;
    }

  };

  public getFileParentListTree = async (pid: number) => {
    let location: string = '';
    let targetFileId: number = pid;
    let response = this.errorResponse;

    if (pid) {
      for (let index = 0; index < filesMaxLayerCount; index++) {
        const file: Files<number, number> = await db
          .from(schemaReferences.files)
          .first()
          .where({
            id: targetFileId
          });

        if (file) {
          location = location + (file.name + '/');
        }

        
        if (index === (filesMaxLayerCount - 1) && file.pid) break;

        if (!file.pid) {
          response.success = true;
          response.message = reverseStr(location, '/');
          break;
        };
        
        targetFileId = file.pid;
      }
    } else {
      response.success = true;
      response.message = '';
    }
    return response;
  };

};