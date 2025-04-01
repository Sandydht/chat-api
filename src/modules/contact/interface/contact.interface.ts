export interface ContactData {
  _id: string | null;
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