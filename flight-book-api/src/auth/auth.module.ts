import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { LoggerModule } from '../logger/logger.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',  // Replace with a strong secret
      signOptions: { expiresIn: '60m' },  // Token expiration time
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // MongoDB user schema
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],  // Export AuthService for other modules
})
export class AuthModule {}
