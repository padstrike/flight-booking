// hooks/useFlights.ts
import { useEffect } from 'react';
import { useFlightStore } from '../store/flightStore';
import api from '../utils/api';

export const useFlights = () => {
  const { setFlights, setError } = useFlightStore();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get('/flights');
        // console.log('response', response);
        setFlights(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching flights:', error);
        setError('Failed to fetch flight data');
      }
    };

    fetchFlights();
  }, [setFlights, setError]);
};