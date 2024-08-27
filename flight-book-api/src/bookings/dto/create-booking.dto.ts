import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'userId123', description: 'User ID' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'flightId123', description: 'Flight ID' })
  flightId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 300, description: 'Total price of the booking' })
  totalPrice: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ example: [{ name: 'John Doe', age: 30 }], description: 'Passenger details' })
  passengerDetails: any[];
}
