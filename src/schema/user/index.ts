import { Schema, model } from 'mongoose';
import { schemaReferences } from '../../constants';
import { IUsers, IUserModel } from './model';

const schema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdDt: {
    type: Date,
    default: new Date()
  },
  updatedDt: {
    type: Date,
    default: null
  },
  logoutAt: {
    type: Date,
    default: null
  }
});

export const UserSchema: IUserModel = model<IUsers, IUserModel>(schemaReferences.user, schema);
export default UserSchema;
