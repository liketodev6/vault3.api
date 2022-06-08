export class SignUpReqModel {
  constructor(data: SignUpReqModel) {
    this.email = data.email;
    this.username = data.username;
  };

  public email: string;
  public username: string;

};