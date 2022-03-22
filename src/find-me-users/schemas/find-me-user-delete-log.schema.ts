import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { FindMeUser } from "@src/find-me-users/schemas/find-me-user.schema";
import { Document, Types } from "mongoose";

@Schema()
export class FindMeUserDeleteLog {
  @ApiProperty()
  @Prop({
      required: true,
      type: Types.ObjectId,
      ref: "FindMeUser",
  })
  public user: FindMeUser;

  @ApiProperty()
  @Prop({ default: new Date() })
  public deleted: Date;
}

export type FindMeUserDeleteLogDocument = FindMeUserDeleteLog & Document;

export const FindMeUserDeleteLogSchema = SchemaFactory.createForClass(FindMeUserDeleteLog);
