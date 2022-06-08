export class SignUpResModel {
  constructor(data: SignUpResModel) {
    this.token = data.token;
  };

  public token: string;
};