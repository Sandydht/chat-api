import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type ChatMessageDocument = HydratedDocument<ChatMessage>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})
export class ChatMessage {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'chat-room'
  })
  chat_room_id: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    default: 'TEXT'
  })
  chat_type: String;

  @Prop({
    type: SchemaTypes.String,
    required: false
  })
  message: string;

  @Prop({
    type: SchemaTypes.String,
    required: false
  })
  photo_url: string;

  @Prop({
    type: SchemaTypes.String,
    required: false
  })
  document_url: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    default: 'ACTIVE'
  })
  data_status: string;
}