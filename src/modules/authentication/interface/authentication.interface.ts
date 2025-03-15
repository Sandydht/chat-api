import { Types } from "mongoose";

export interface RegisterAccountResponse {
  status: string;
  access_token: string;
}

export interface RegisteredUserAccount {
  _id: Types.ObjectId;
  photo_url?: string;
  name: string;
  phone_number: string;
  password: string;
}