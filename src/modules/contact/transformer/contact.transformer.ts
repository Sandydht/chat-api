import { ContactData, ContactDataWithMemberData, MemberData } from "../interface/contact.interface";

export const getContactData = (data: ContactData) => contactData(data);
export const getContactListData = (datas: ContactDataWithMemberData[]) => datas.map((data: ContactDataWithMemberData) => contactDataWithMemberData(data));

const contactData = (data: ContactData) => ({
  _id: data._id || null,
  owner_id: data.owner_id || null,
  member_id: data.member_id || null
})

const contactDataWithMemberData = (data: ContactDataWithMemberData) => ({
  _id: data._id || null,
  owner_id: data.owner_id || null,
  member_id: memberData(data.member_id)
})

const memberData = (data: any) => ({
  _id: data._id || null,
  photo_url: data.photo_url || null,
  name: data.name || null,
  phone_number: data.phone_number || null,
  description: data.description || null
})
