// store/flightStore.ts
import create from 'zustand';

interface FlightState {
  flights: any[];
  loading: boolean;
  error: string | null;
  setFlights: (flights: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFlightStore = create<FlightState>((set) => ({
  flights: [],
  loading: false,
  error: null,
  setFlights: (flights) => set({ flights }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
