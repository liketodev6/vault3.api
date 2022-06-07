import { injectable } from "inversify";
import { SignUpReqModel } from "../api/auth/model/req/signUp";
import { User } from "../model/user";
import { UserRepository } from "../repository/user";

@injectable()
export class UserManager implements IUserManager {

  public get UserRepo() {
    return new UserRepository();
  };

  public create = async (data: SignUpReqModel): Promise<User> => {
    return await this.UserRepo.create(data);
  };

  public getById = async (id: number): Promise<User> => {
    return await this.UserRepo.getById(id);
  };

  public signOut = async (id: number) => {
    await this.UserRepo.signOut(id);
  };

  public signIn = async (id: number) => {
    await this.UserRepo.signIn(id);
  };

  public findExists = async (username: string, email: string) => {
    return await this.UserRepo.findExists(username, email);
  };

};

export default interface IUserManager {
  create: (data: SignUpReqModel) => Promise<User>;
  getById: (id: number) => Promise<User>;
  signOut: (id: number) => Promise<void>;
  signIn: (id: number) => Promise<void>;
  findExists: (username: string, email: string) => Promise<boolean>;
};