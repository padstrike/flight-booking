import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';

@Module({
  providers: [AppLogger],   // Ensure AppLogger is a provider
  exports: [AppLogger],     // Ensure AppLogger is exported for use in other modules
})
export class LoggerModule {}
