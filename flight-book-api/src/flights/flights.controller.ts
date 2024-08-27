import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FlightsService } from './flights.service';

@ApiTags('Flights')
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @ApiOperation({ summary: 'Retrieve a list of available flights' })
  @ApiResponse({ status: 200, description: 'List of flights retrieved successfully.' })
  @Get('search')
  getFlights() {
    return this.flightsService.getFlights();
  }

  @ApiOperation({ summary: 'Retrieve flight details by ID' })
  @ApiResponse({ status: 200, description: 'Flight details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Flight not found.' })
  @Get(':id')
  getFlight(@Param('id') id: number) {
    return this.flightsService.getFlightById(Number(id));
  }
}
