import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FlightsModule } from './flights/flights.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { RedisModule } from './redis/redis.module';
import { LoggerModule } from './logger/logger.module'
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Global configuration
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://root:example@localhost:27017/nest_flight_booking?authSource=admin'),  // Load MONGO_URI from environment
    AuthModule,
    FlightsModule,
    BookingsModule,
    PaymentsModule,
    RedisModule,
    LoggerModule,
  ],
})
export class AppModule {}
