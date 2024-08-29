import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('Payment')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.processPayment(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get payment details by ID' })
  @ApiResponse({ status: 200, description: 'Payment details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get(':id')
  async getPaymentDetails(@Param('id') paymentId: string) {
    return this.paymentsService.getBookingHistoryWithPaymentDetails(paymentId);
  }
}
