import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  flightId: string;

  @Prop({ type: Object, required: true })  // Define the type explicitly
  passengerDetails: any;  // If you have a more specific structure, you can create a nested schema instead of 'any'

  @Prop({ required: true })
  totalPrice: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
