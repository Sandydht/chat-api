import { Types } from "mongoose";

export interface RegisterAccountResponse {
  status: string;
  access_token: string;
}

export interface LogoutAccountResponse {
  status: string;
  message: string;
}

export interface RegisteredUserAccount {
  _id: Types.ObjectId;
  photo_url?: string;
  name: string;
  phone_number: string;
  password: string;
  description: string;
}

export interface UserJwtPayload {
  _id: string;
}