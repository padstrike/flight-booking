import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    private readonly redisService: RedisService, // Inject RedisService
  ) {}

  // Create a new booking and invalidate the cache for the user's bookings
  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    try {
      const newBooking = new this.bookingModel(createBookingDto);
      const savedBooking = await newBooking.save();

      // Invalidate the cache for the user's bookings after a new booking is created
      const cacheKey = `user_bookings_${savedBooking.userId}`;
      await this.redisService.del(cacheKey);

      return savedBooking;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create booking', (error as Error).message);
    }
  }

  // Fetch bookings by user ID, check the cache first, then fetch from the database if needed
  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const cacheKey = `user_bookings_${userId}`;

    try {
      // Check if the bookings are in the Redis cache
      const cachedBookings = await this.redisService.get(cacheKey);
      if (cachedBookings) {
        return JSON.parse(cachedBookings);
      }

      // If not in the cache, fetch bookings from the database
      const bookings = await this.bookingModel.find({ userId }).exec();

      // Store the result in Redis cache for future use, with a 1-hour expiration
      await this.redisService.set(cacheKey, JSON.stringify(bookings), 3600);

      return bookings;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve bookings', (error as Error).message);
    }
  }
}
