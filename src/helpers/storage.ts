class StorageHelper {
  
  public parceFromKbToGb = (value: number) => value * 1024 * 1024;

  public generateStorageDirectory = (userId: number, storageId: number) => (`u_${userId}_s_${storageId}`);

};

export default new StorageHelper();