import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly algorithm = 'aes-256-cbc';
  private readonly key = crypto.randomBytes(32);
  private readonly iv = crypto.randomBytes(16);

  constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<Payment>) {}

  async processPayment(createPaymentDto: CreatePaymentDto) {
    // Step 1: Encrypt sensitive payment data before storing
    const encryptedDetails = this.encrypt(JSON.stringify(createPaymentDto.paymentDetails));

    // Step 2: Save the encrypted payment details in the database
    const newPayment = new this.paymentModel({
      userId: createPaymentDto.userId,
      bookingId: createPaymentDto.bookingId,
      encryptedPaymentDetails: encryptedDetails,
      status: 'pending',
      createdAt: new Date(),
    });

    const savedPayment = await newPayment.save();

    // Log and return the payment ID
    this.logger.log(`Payment initiated for booking ${savedPayment.bookingId}`);
    return savedPayment;
  }

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(data: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async updatePaymentStatus(paymentId: string, status: string) {
    const payment = await this.paymentModel.findById(paymentId).exec();
    if (!payment) {
      throw new Error('Payment not found');
    }

    payment.status = status;
    await payment.save();

    this.logger.log(`Payment ${paymentId} updated to status ${status}`);
    return payment;
  }
}
