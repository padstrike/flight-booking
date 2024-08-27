import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  password: string;
}
