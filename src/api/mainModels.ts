import { Request } from 'express';
import { User } from '../model/user';

export const getResponse = <T>(success: boolean, message: string, data?: T | null | undefined): IResponseModel<T> => {
  const response: IResponseModel<T> = { success, message, data: data || null };
  return response;
};

export const getErrorResponse = <T>(): IResponseModel<T> => {
  const response: IResponseModel<T> = { success: false, message: 'Something went wrong', data: null };
  return response;
};

export interface IResponseModel<T> {
  success: boolean;
  message: string;
  data: T;
};

export interface IRequest extends Request {
  user?: User;
  userDbKey?: string;
};