import { Controller, Get, Param } from '@nestjs/common';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('search')
  getFlights() {
    return this.flightsService.getFlights();
  }

  @Get(':id')
  getFlight(@Param('id') id: number) {
    return this.flightsService.getFlightById(Number(id));
  }
}
