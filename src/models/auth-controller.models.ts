import { Types } from "mongoose";

export interface RegisterUserResponse {
  status: string;
  access_token: string;
  data: RegisterUserData;
}

export interface RegisterUserData {
  _id: Types.ObjectId | null;
  photo_url: string | null;
  name: string | null;
  phone_number: string | null;
}