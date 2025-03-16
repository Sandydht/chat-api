import { UserProfile } from "../interface/user.interface";

export const getUserProfileData = (data: UserProfile) => userProfileData(data);
export const getUserListData = (datas: UserProfile[]) => datas.map((data: UserProfile) => userListData(data));

const userProfileData = (data: UserProfile) => {
  return {
    _id: data._id || null,
    photo_url: data.photo_url || null,
    name: data.name || null,
    phone_number: data.phone_number || null,
    description: data.description || null
  }
};

const userListData = (data: UserProfile) => {
  return {
    _id: data._id || null,
    photo_url: data.photo_url || null,
    name: data.name || null,
    phone_number: data.phone_number || null,
    description: data.description || null,
    is_contact: data.is_contact ? true : false
  }
}
