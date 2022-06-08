import { Document, Model } from 'mongoose';

interface IUserDocument extends Document {
  username: string;
  email: string;
  logoutAt: Date;
  createdDt: Date;
  updatedDt: Date;
}

export interface IUsers extends IUserDocument {}

export interface IUserModel extends Model<IUsers> {
    
};
