import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

import { FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";

@Schema()
export class FindMeResetPasswordToken {
    @ApiProperty()
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: "FindMeUser",
    })
    public user: FindMeUserDocument;

    @ApiProperty()
    @Prop({
        required: true,
        unique: true,
    })
    public token: string;

    @ApiProperty()
    @Prop({ default: new Date() })
    public generated: Date;
}

export type FindMeResetPasswordTokenDocument = FindMeResetPasswordToken & Document;

export const FindMeResetPasswordTokenSchema = SchemaFactory.createForClass(FindMeResetPasswordToken);
