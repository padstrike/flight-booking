// store/flightStore.ts
import create from 'zustand';

interface FlightState {
  flights: any[];
  flightId: number;
  loading: boolean;
  error: string | null;
  setFlights: (flights: any[]) => void;
  setFlightsId: (flightId: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFlightStore = create<FlightState>((set) => ({
  flights: [],
  flightId: 0,
  loading: false,
  error: null,
  setFlights: (flights) => set({ flights }),
  setFlightsId: (flightId) => set({ flightId }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
