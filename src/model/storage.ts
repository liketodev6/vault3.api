export class Storage<T> {
  public id?: number;
  public user: T;
  public totalSize: number;
  public usedSize? : number = 0;
  public availableSize?: number = 0;
  public directory: string;
  public activeAt: Date;
  public expireDt: Date;
  public createdDt: Date;
  public updatedDt?: Date;
};