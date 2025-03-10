import { Types } from "mongoose";

export interface ProfileUserResponse {
  status: string;
  data: UserData;
}

export interface UserData {
  _id: Types.ObjectId | null;
  photo_url?: string | null;
  name: string | null;
  phone_number: string | null;
  data_status: string | null;
}