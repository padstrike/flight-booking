import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  email: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'hashedpassword123', description: 'The hashed password of the user' })
  password: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
