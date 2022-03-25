import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { FindMeUserDocument } from "@/find-me-users/schemas/find-me-user.schema";

@Schema()
export class FindMeUserAccessLog {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: "FindMeUser",
    })
    public accessedUser: FindMeUserDocument;

    @Prop({
        default: null,
        type: Types.ObjectId,
        ref: "FindMeUser",
    })
    public accessingUser: FindMeUserDocument;

    @Prop({ default: new Date() })
    public accessDate: Date;
}

export type FindMeUserAccessLogDocument = FindMeUserAccessLog & Document;

export const FindMeUserAccessLogSchema = SchemaFactory.createForClass(FindMeUserAccessLog);
