import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightsService {
  // Mock flight data
  private flights = [
    { id: 1, origin: 'JFK', destination: 'LAX', price: 300 },
    { id: 2, origin: 'SFO', destination: 'ORD', price: 200 },
    { id: 3, origin: 'JFK', destination: 'ORD', price: 250 },
    { id: 4, origin: 'LAX', destination: 'SFO', price: 150 },
  ];

  // Get all flights or filter based on search params
  getFlights(origin?: string, destination?: string) {
    let filteredFlights = this.flights;

    // Filter by origin if provided
    if (origin && destination) {
      filteredFlights = filteredFlights.filter(flight =>
        flight.origin.toLowerCase() === origin.toLowerCase() &&
        flight.destination.toLowerCase() === destination.toLowerCase(),
      );
    } else if (origin) {
      // Filter by origin only
      filteredFlights = filteredFlights.filter(flight =>
        flight.origin.toLowerCase() === origin.toLowerCase(),
      );
    } else if (destination) {
      // Filter by destination only
      filteredFlights = filteredFlights.filter(flight =>
        flight.destination.toLowerCase() === destination.toLowerCase(),
      );
    }
  
    return filteredFlights;
  }

  // Get a flight by its ID
  getFlightById(id: number) {
    return this.flights.find((flight) => flight.id === id);
  }
}
