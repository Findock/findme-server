import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FindMeUser {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  surname: string;

  @Prop({ default: '' })
  phoneNumber: string;

  @Prop({ default: '' })
  profileImageUrl: string;

  @Prop({ default: new Date() })
  created: Date;

  @Prop({ default: new Date() })
  lastLogin: Date;
}

export type FindMeUserDocument = FindMeUser & Document;

export const FindMeUserSchema = SchemaFactory.createForClass(FindMeUser);
