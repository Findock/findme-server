import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class FindMeSeederLog {
  @Prop({ required: true })
  public key: string;

  @Prop({ default: false })
  public seeded: boolean;
}

export type FindMeSeederLogDocument = FindMeSeederLog & Document;

export const FindMeSeederLogSchema = SchemaFactory.createForClass(FindMeSeederLog);
