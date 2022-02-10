import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class FindMeUser {
  @ApiProperty()
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ default: '' })
  name: string;

  @ApiProperty()
  @Prop({ default: '' })
  phoneNumber: string;

  @ApiProperty()
  @Prop({ default: '' })
  profileImageUrl: string;

  @ApiProperty()
  @Prop({ default: new Date() })
  created: Date;

  @ApiProperty()
  @Prop({ default: new Date() })
  lastLogin: Date;
}

export type FindMeUserDocument = FindMeUser & Document;

export const FindMeUserSchema = SchemaFactory.createForClass(FindMeUser);
