import { Types } from "mongoose";

export interface ContactData {
  _id: Types.ObjectId | string | null;
  owner_id: string | null;
  member_id: string | null;
}

export interface SaveContactRequest {
  member_id: string;
}

export interface SaveContactResponse {
  status: string;
  message: string;
}

export interface ContactDataWithMemberData {
  _id: Types.ObjectId | string | null;
  owner_id: string | null;
  member_id: any;
}

export interface MemberData {
  _id: Types.ObjectId | string | null;
  photo_url?: string | null;
  name: string | null;
  phone_number: string | null;
  description?: string | null;
}