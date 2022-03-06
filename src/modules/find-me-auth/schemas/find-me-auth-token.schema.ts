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

    @Prop({ required: true })
    public token: string;

    @ApiProperty()
    @Prop({ required: true })
    public userId: string;

    @ApiProperty()
    @Prop({ default: new Date() })
    public lastUse: Date;

    @ApiProperty()
    @Prop({ default: true })
    public active: boolean;
}

export type FindMeAuthTokenDocument = FindMeAuthToken & Document;

export const FindMeAuthTokenSchema = SchemaFactory.createForClass(FindMeAuthToken);
