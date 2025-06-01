import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  phoneNumber: string | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      phoneNumber: null,
      isAuthenticated: false,
      login: (phoneNumber: string) => 
        set({ phoneNumber, isAuthenticated: true }),
      logout: () => 
        set({ phoneNumber: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore; 