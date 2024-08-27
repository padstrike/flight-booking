import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    private readonly redisService: RedisService, // Inject RedisService
  ) {}

  async createBooking(createBookingDto: any): Promise<Booking> {
    const newBooking = new this.bookingModel(createBookingDto);
    const savedBooking = await newBooking.save();
    
    // Invalidate the cache for the user after booking creation
    const cacheKey = `user_bookings_${savedBooking.userId}`;
    await this.redisService.del(cacheKey);

    return savedBooking;
  }

  async getBookingsByUserId(userId: string): Promise<Booking[]> {
    const cacheKey = `user_bookings_${userId}`;
    
    // Check if the bookings are in the cache
    const cachedBookings = await this.redisService.get(cacheKey);
    if (cachedBookings) {
      return JSON.parse(cachedBookings);
    }

    // If not in cache, fetch from database
    const bookings = await this.bookingModel.find({ userId }).exec();
    
    // Store the result in Redis cache for future use
    await this.redisService.set(cacheKey, JSON.stringify(bookings), 3600); // Cache for 1 hour
    
    return bookings;
  }
}
