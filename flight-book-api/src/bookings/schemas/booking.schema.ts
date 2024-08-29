import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ required: true })
  userId: string = '';

  @Prop({ required: true })
  flightId: string = '';

  @Prop({ required: true })
  totalPrice: number = 0;

  @Prop({
    type: [{ name: { type: String, required: true }, age: { type: Number, required: true } }],
    required: true,
  })
  passengerDetails: { name: string; age: number }[] = [];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
