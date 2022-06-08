export class CreateFolderReqModel {
  constructor(data: CreateFolderReqModel) {
    this.name = data.name;
    this.parentId = data.parentId;
  };

  public parentId: number;
  public name: string;
};