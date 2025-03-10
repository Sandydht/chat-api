import { Types } from "mongoose";

export interface AddNewContactResponse {
  member_id: Types.ObjectId | null;
  data_status: string | null;
}
