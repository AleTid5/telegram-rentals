import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ApartmentDocument = Apartment & Document;

@Schema()
export class Apartment {
  @Prop({ index: true, auto: false, unique: true })
  id: string;

  @Prop()
  realEstate: string;

  @Prop()
  link: string;

  @Prop()
  price: string;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
