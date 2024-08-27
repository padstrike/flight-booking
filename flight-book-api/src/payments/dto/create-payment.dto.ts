import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaymentDetailsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The credit card number' })
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the cardholder' })
  cardHolder: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The expiry date of the card (MM/YY)' })
  expiryDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The CVV security code of the card' })
  cvv: string;
}

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the user making the payment' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the booking associated with the payment' })
  bookingId: string;

  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  @IsNotEmpty()
  @ApiProperty({ description: 'The payment details (e.g., credit card info)' })
  paymentDetails: PaymentDetailsDto;
}
