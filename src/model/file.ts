import { FileTypeEnum } from "../constants/enums";

export class Files<P, S> {
  public id?: number;
  public pid?: P;
  public storage: S;
  public type: FileTypeEnum;
  public name: string;
  public extension?: string;
  public originalName: string;
  public maskName: string;
  public size?: number;
  public downloadCount?: number;
  public viewedCount?: number;
  public createdDt?: Date;
  public updatedDt?: Date;
};