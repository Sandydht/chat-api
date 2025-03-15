import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})
export class User {
  @Prop({
    type: SchemaTypes.String,
    required: false
  })
  photo_url: string;

  @Prop({
    type: SchemaTypes.String,
    required: true
  })
  name: string;

  @Prop({
    type: SchemaTypes.String,
    required: true
  })
  phone_number: string;

  @Prop({
    type: SchemaTypes.String,
    required: true
  })
  password: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    default: 'ACTIVE'
  })
  data_status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
