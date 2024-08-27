import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('Payment')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.processPayment(createPaymentDto);
  }

  @ApiOperation({ summary: 'Update payment status' })
  @ApiResponse({ status: 200, description: 'Payment status successfully updated.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('update-status/:paymentId')
  async updatePaymentStatus(
    @Param('paymentId') paymentId: string,
    @Body('status') status: string,
  ) {
    return this.paymentsService.updatePaymentStatus(paymentId, status);
  }
}
