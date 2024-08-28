import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightsService {
  // Mock flight data
  private flights = [
    {
      id: 1,
      origin: 'JFK',
      originFullName: 'John F. Kennedy International Airport',
      destination: 'ORD',
      destinationFullName: 'O Hare International Airport',
      price: 300,
      airline: 'American Airlines',
      airlineLogo: '/images/american-airlines-logo.png',
      departureTime: '08:00 AM',
      arrivalTime: '11:00 AM',
      stops: 'Non-stop',
      duration: '3h 00m',
      cabin: 'Economy',
      baggage: '1 checked bag',
      aircraft: 'Boeing 737',
      date: 'Tue, Sep 24, 2024',
    },
    {
      id: 2,
      origin: 'SFO',
      originFullName: 'San Francisco International Airport',
      destination: 'ORD',
      destinationFullName: 'O Hare International Airport',
      price: 200,
      airline: 'United Airlines',
      airlineLogo: '/images/united-airlines-logo.png',
      departureTime: '12:00 PM',
      arrivalTime: '06:00 PM',
      stops: '1 stop in DEN',
      duration: '7h 15m',
      cabin: 'Economy',
      baggage: '1 checked bag',
      aircraft: 'Airbus A320',
      date: 'Fri, Sep 20, 2024',
    },
    {
      id: 3,
      origin: 'LAX',
      originFullName: 'Los Angeles International Airport',
      destination: 'JFK',
      destinationFullName: 'John F. Kennedy International Airport',
      price: 350,
      airline: 'Delta Airlines',
      airlineLogo: '/images/delta-airlines-logo.png',
      departureTime: '03:00 PM',
      arrivalTime: '11:00 PM',
      stops: 'Non-stop',
      duration: '5h 00m',
      cabin: 'Economy',
      baggage: '2 checked bags',
      aircraft: 'Boeing 777',
      date: 'Mon, Oct 1, 2024',
    },
    {
      id: 4,
      origin: 'MIA',
      originFullName: 'Miami International Airport',
      destination: 'LAX',
      destinationFullName: 'Los Angeles International Airport',
      price: 275,
      airline: 'American Airlines',
      airlineLogo: '/images/american-airlines-logo.png',
      departureTime: '06:00 AM',
      arrivalTime: '09:00 AM',
      stops: '1 stop in DFW',
      duration: '7h 00m',
      cabin: 'Business',
      baggage: '2 checked bags',
      aircraft: 'Airbus A321',
      date: 'Wed, Sep 19, 2024',
    },
    {
      id: 5,
      origin: 'ORD',
      originFullName: 'O Hare International Airport',
      destination: 'SFO',
      destinationFullName: 'San Francisco International Airport',
      price: 400,
      airline: 'United Airlines',
      airlineLogo: '/images/united-airlines-logo.png',
      departureTime: '05:00 PM',
      arrivalTime: '07:30 PM',
      stops: 'Non-stop',
      duration: '4h 30m',
      cabin: 'First Class',
      baggage: '3 checked bags',
      aircraft: 'Boeing 747',
      date: 'Thu, Sep 27, 2024',
    },
    {
      id: 6,
      origin: 'SEA',
      originFullName: 'Seattle-Tacoma International Airport',
      destination: 'LAS',
      destinationFullName: 'Harry Reid International Airport',
      price: 150,
      airline: 'Alaska Airlines',
      airlineLogo: '/images/alaska-airlines-logo.png',
      departureTime: '10:00 AM',
      arrivalTime: '12:30 PM',
      stops: 'Non-stop',
      duration: '2h 30m',
      cabin: 'Economy',
      baggage: '1 checked bag',
      aircraft: 'Boeing 737',
      date: 'Sat, Sep 29, 2024',
    },
    {
      id: 7,
      origin: 'BOS',
      originFullName: 'Logan International Airport',
      destination: 'ATL',
      destinationFullName: 'Hartsfield-Jackson Atlanta International Airport',
      price: 250,
      airline: 'Delta Airlines',
      airlineLogo: '/images/delta-airlines-logo.png',
      departureTime: '09:00 AM',
      arrivalTime: '12:00 PM',
      stops: '1 stop in CLT',
      duration: '5h 00m',
      cabin: 'Economy',
      baggage: '1 checked bag',
      aircraft: 'Airbus A320',
      date: 'Sun, Sep 30, 2024',
    },
    {
      id: 8,
      origin: 'DFW',
      originFullName: 'Dallas/Fort Worth International Airport',
      destination: 'MIA',
      destinationFullName: 'Miami International Airport',
      price: 180,
      airline: 'American Airlines',
      airlineLogo: '/images/american-airlines-logo.png',
      departureTime: '07:00 AM',
      arrivalTime: '11:00 AM',
      stops: '1 stop in ATL',
      duration: '4h 00m',
      cabin: 'Business',
      baggage: '2 checked bags',
      aircraft: 'Boeing 737',
      date: 'Mon, Oct 8, 2024',
    },
    {
      id: 9,
      origin: 'LAX',
      originFullName: 'Los Angeles International Airport',
      destination: 'SEA',
      destinationFullName: 'Seattle-Tacoma International Airport',
      price: 170,
      airline: 'Alaska Airlines',
      airlineLogo: '/images/alaska-airlines-logo.png',
      departureTime: '01:00 PM',
      arrivalTime: '03:00 PM',
      stops: 'Non-stop',
      duration: '2h 00m',
      cabin: 'Economy',
      baggage: '1 checked bag',
      aircraft: 'Boeing 737',
      date: 'Tue, Oct 9, 2024',
    },
    {
      id: 10,
      origin: 'JFK',
      originFullName: 'John F. Kennedy International Airport',
      destination: 'MIA',
      destinationFullName: 'Miami International Airport',
      price: 220,
      airline: 'Delta Airlines',
      airlineLogo: '/images/delta-airlines-logo.png',
      departureTime: '10:00 AM',
      arrivalTime: '01:00 PM',
      stops: 'Non-stop',
      duration: '3h 00m',
      cabin: 'Economy',
      baggage: '1 checked bag',
      aircraft: 'Airbus A320',
      date: 'Wed, Oct 10, 2024',
    },
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
    console.log(filteredFlights)

    return filteredFlights;
  }

  // Get a flight by its ID
  getFlightById(id: number) {
    return this.flights.find((flight) => flight.id === id);
  }
}
