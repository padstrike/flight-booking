import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  bookingId: string;

  @Prop({ required: true })
  encryptedPaymentDetails: string;

  @Prop({ required: true, default: 'pending' })
  status: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
