import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom } from 'src/schemas/chat-room.schemas';
import { ChatRoomData } from './interface/chat-room.interface';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(ChatRoom.name) private readonly chatRoomModel: Model<ChatRoom>
  ) { }

  async createChatRoom(createChatRoomDto: CreateChatRoomDto): Promise<ChatRoomData | boolean> {
    const findChatRoom = await this.validateChatRoomData(createChatRoomDto);
    if (findChatRoom) return true;

    const chatRoom = await this.chatRoomModel.create({
      sender_id: createChatRoomDto.senderID,
      recipient_id: createChatRoomDto.recipientID
    });
    return chatRoom as unknown as ChatRoomData;
  }

  async chatRoomList(senderID: string): Promise<any> {
    const findChatRooms = await this.chatRoomModel
      .find({
        sender_id: senderID,
        data_status: 'ACTIVE'
      })
      .populate('recipient_id')
      .lean()
      .exec();
    return findChatRooms;
  }

  async validateChatRoomData(createChatRoomDto: CreateChatRoomDto): Promise<ChatRoomData | null> {
    const findChatRoom = await this.chatRoomModel.findById({ 
      sender_id: createChatRoomDto.senderID,
      recipient_id: createChatRoomDto.recipientID 
    }).lean().exec();
    if (findChatRoom) return findChatRoom;
    return null;
  }
}
