import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Booking } from '../bookings/schemas/booking.schema';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly algorithm = 'aes-256-cbc';
  
  // Replace these with securely stored values
  private readonly key = Buffer.from(process.env.ENCRYPTION_KEY as string, 'hex'); // 32 bytes key
  private readonly iv = Buffer.from(process.env.ENCRYPTION_IV as string, 'hex');   // 16 bytes IV

  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}

  async processPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    this.logger.log(`Processing payment for user: ${createPaymentDto.userId}, booking: ${createPaymentDto.bookingId}`);

    try {
      const encryptedDetails = this.encrypt(JSON.stringify(createPaymentDto.paymentDetails));

      const newPayment = new this.paymentModel({
        userId: createPaymentDto.userId,
        bookingId: createPaymentDto.bookingId,
        encryptedPaymentDetails: encryptedDetails,
        status: 'pending',
        createdAt: new Date(),
      });

      const savedPayment = await newPayment.save();
      this.logger.log(`Payment initiated for booking ${savedPayment.bookingId}`);
      return savedPayment;

    } catch (error) {
      this.logger.error(`Failed to process payment for user: ${createPaymentDto.userId}`, (error as Error).stack);
      throw new InternalServerErrorException('Payment processing failed. Please try again later.');
    }
  }

  async getBookingHistoryWithPaymentDetails(userId: string): Promise<any> {
    this.logger.log(`Retrieving booking history with payment details for user ID: ${userId}`);

    const bookings = await this.findBookingsByUserId(userId);

    const bookingHistory = await Promise.all(bookings.map(booking => this.getBookingWithPaymentDetails(booking)));

    return bookingHistory;
  }

  private async findBookingsByUserId(userId: string): Promise<Booking[]> {
    try {
      const bookings = await this.bookingModel.find({ userId }).exec();

      if (!bookings || bookings.length === 0) {
        this.logger.warn(`No bookings found for user ID: ${userId}`);
        // throw new NotFoundException(`No bookings found for user ID: ${userId}`);
      }

      return bookings;
    } catch (error) {
      this.logger.error(`Failed to retrieve bookings for user ID: ${userId}`, (error as Error).stack);
      // throw new InternalServerErrorException('Failed to retrieve bookings. Please try again later.');
    }
  }

  private async getBookingWithPaymentDetails(booking: Booking): Promise<any> {
    try {
      const payment = await this.paymentModel.findOne({ bookingId: booking._id }).exec();

      if (!payment) {
        this.logger.warn(`No payment found for booking ID: ${booking._id}`);
      }

      return {
        bookingId: booking._id,
        flightId: booking.flightId,
        totalPrice: booking.totalPrice,
        passengerDetails: booking.passengerDetails,
        bookingDate: payment.createdAt,
        paymentDetails: payment ? JSON.parse(this.decrypt(payment.encryptedPaymentDetails)) : null,
        paymentStatus: payment ? payment.status : 'No payment found',
        paymentDate: payment ? payment.createdAt : null,
      };
    } catch (error) {
      this.logger.error(`Failed to retrieve payment details for booking ID: ${booking._id}`, (error as Error).stack);
      throw new InternalServerErrorException('Failed to retrieve payment details. Please try again later.');
    }
  }

  private encrypt(data: string): string {
    try {
        this.logger.log(`Encrypting data: ${data}`);
        this.logger.log(`Using key: ${this.key.toString('hex')}`);
        this.logger.log(`Using IV: ${this.iv.toString('hex')}`);

        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        this.logger.error('Failed to encrypt payment details', (error as Error).stack);
        throw new InternalServerErrorException('Failed to encrypt payment details. Please try again later.');
    }
}

  private decrypt(encryptedText: string): string {
    try {
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      this.logger.error('Failed to decrypt payment details', (error as Error).stack);
      throw new InternalServerErrorException('Failed to decrypt payment details. Please try again later.');
    }
  }
}
