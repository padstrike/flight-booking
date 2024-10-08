import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FlightsModule } from './flights/flights.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { RedisModule } from './redis/redis.module';
import { LoggerModule } from './logger/logger.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL ?? 'mongodb://root:example@mongo:27017/nest_flight_booking?authSource=admin'),
    FlightsModule,
    BookingsModule,
    PaymentsModule,
    RedisModule,
    LoggerModule,
  ],
})
export class AppModule {}
