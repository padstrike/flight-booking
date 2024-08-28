import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user bookings' })
  @ApiResponse({ status: 200, description: 'Bookings fetched successfully.' })
  @ApiResponse({ status: 404, description: 'No bookings found for this user.' })
  getUserBookings(@Param('userId') userId: string) {
    return this.bookingsService.getBookingsByUserId(userId);
  }
}
