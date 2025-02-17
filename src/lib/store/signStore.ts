import { create } from 'zustand';

interface SignState {
  message: string;
  signature: string | null;
  isLoading: boolean;
  error: string | null;
  setMessage: (message: string) => void;
  setSignature: (signature: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useSignStore = create<SignState>((set) => ({
  message: 'Hello Quantinium!',
  signature: null,
  isLoading: false,
  error: null,
  setMessage: (message) => set({ message }),
  setSignature: (signature) => set({ signature }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({
    message: 'Hello Quantinium!',
    signature: null,
    isLoading: false,
    error: null,
  }),
}));