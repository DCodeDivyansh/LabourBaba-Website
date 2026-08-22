import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocationData } from '@/types/types';

interface LocationStore {
  currentLocation: LocationData | null;
  selectedLocation: LocationData | null;
  isLoading: boolean;
  error: string | null;
  setCurrentLocation: (location: LocationData | null) => void;
  setSelectedLocation: (location: LocationData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetLocationStore: () => void;
}

const initialState = {
  currentLocation: null,
  selectedLocation: null,
  isLoading: false,
  error: null,
};

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentLocation: (location) => set({ currentLocation: location }),

      setSelectedLocation: (location) => set({ selectedLocation: location }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      resetLocationStore: () => set(initialState),
    }),
    {
      name: 'location-storage', // key in localStorage
    }
  )
);
