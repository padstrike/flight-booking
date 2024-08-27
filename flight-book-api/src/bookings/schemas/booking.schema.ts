import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  flightId: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({
    type: [{ name: { type: String }, age: { type: Number } }],
    required: true,
  })
  passengerDetails: { name: string; age: number }[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
