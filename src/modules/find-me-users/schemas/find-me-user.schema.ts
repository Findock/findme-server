import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

@Schema()
export class FindMeUser {
  @ApiProperty()
  @Prop({
      required: true,
      unique: true,
  })
  public email: string;

  @ApiProperty()
  @Prop({ required: true })
  public password: string;

  @ApiProperty()
  @Prop({ default: "" })
  public name: string;

  @ApiProperty()
  @Prop({ default: "" })
  public phoneNumber: string;

  @ApiProperty()
  @Prop({ default: "" })
  public profileImageUrl: string;

  @ApiProperty()
  @Prop({ default: new Date() })
  public created: Date;

  @ApiProperty()
  @Prop({ default: new Date() })
  public lastLogin: Date;

  @ApiProperty()
  @Prop({ default: "" })
  public street: string;

  @ApiProperty()
  @Prop({ default: "" })
  public city: string;

  @ApiProperty()
  @Prop({ default: "" })
  public bio: string;
}

export type FindMeUserDocument = FindMeUser & Document;

export const FindMeUserSchema = SchemaFactory.createForClass(FindMeUser);
