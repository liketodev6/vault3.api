import { ValidatePaymentReqModel } from "../api/auth/model/req/validatePayment";
import { User } from "../model/user";
import db from '../db/db';
import { schemaReferences } from "../constants";
import { Storage } from '../model/storage';
import StorageHelper from '../helpers/storage';

export class StorageRepository {

  public create = async (user: User, body: ValidatePaymentReqModel) => {
    const storageModel: Storage<number> = {
      user: user.id,
      totalSize: body.storageSize,
      directory: '',
      activeAt: new Date(),
      expireDt: body.expireDate,
      createdDt: new Date()
    };

    const storage: {id: number}[] = await db.from(schemaReferences.storages).insert(storageModel).returning(['id']);
    const id = storage[0].id;
    await db(schemaReferences.storages)
      .where({ id })
      .update({ directory: StorageHelper.generateStorageDirectory(user.id, id) },);
    return id;
  };

  public findByUserId = async (user: number): Promise<Storage<number>> => {

    return await db.from(schemaReferences.storages).first().where({
      user
    });

  };

};