const flights = [
    { id: 1, origin: 'NYC', destination: 'LAX', date: '2024-09-10', price: 300 },
    { id: 2, origin: 'LAX', destination: 'NYC', date: '2024-09-11', price: 280 },
    // Other flights...
];

exports.findFlightById = (flightId) => {
    console.log(flights.find(flight => flight.id === flightId));

    return flights.find(flight => flight.id === flightId);
};

exports.searchFlights = (req, res) => {
    const { origin, destination, date } = req.body;
    const results = flights.filter(flight =>
        flight.origin === origin &&
        flight.destination === destination &&
        flight.date === date
    );
    res.json(results);
};

exports.allFlights = (req, res) => {
    res.json(flights)
}
