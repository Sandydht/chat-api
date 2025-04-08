import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type ContactDocument = HydratedDocument<Contact>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})
export class Contact {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  })
  owner_id: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  })
  member_id: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    default: 'ACTIVE'
  })
  data_status: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);