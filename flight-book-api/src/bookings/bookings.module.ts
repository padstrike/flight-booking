import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { RedisModule } from '../redis/redis.module';  // Import the RedisModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    RedisModule,  // Add RedisModule to imports
  ],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
