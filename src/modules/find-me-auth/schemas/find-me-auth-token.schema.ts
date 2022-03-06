import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class FindMeAuthToken {
    @ApiProperty()
    @Prop({ required: true })
    public deviceName: string;

    @ApiProperty()
    @Prop({ required: true })
    public localizationDescription: string;

    @ApiProperty()
    @Prop({ required: true })
    public token: string;

    @ApiProperty()
    @Prop({ default: new Date() })
    public lastUse: Date;
}

export type FindMeAuthTokenDocument = FindMeAuthToken & Document;

export const FindMeAuthTokenSchema = SchemaFactory.createForClass(FindMeAuthToken);
