export interface GetUserProfileResponse {
  status: string;
  data: UserProfile;
}

export interface UserProfile {
  _id: string | null;
  photo_url?: string | null;
  name: string | null;
  phone_number: string | null;
  description?: string | null;
  is_contact?: boolean | null;
}

export interface GetUsersResponse {
  status: string;
  data: UserProfile[];
}
