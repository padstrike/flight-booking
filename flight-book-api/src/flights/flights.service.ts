import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightsService {
  getFlights() {
    return [
      { id: 1, origin: 'JFK', destination: 'LAX', price: 300 },
      { id: 2, origin: 'SFO', destination: 'ORD', price: 200 },
    ];
  }

  getFlightById(id: number) {
    const flights = this.getFlights();
    return flights.find((flight) => flight.id === id);
  }
}
