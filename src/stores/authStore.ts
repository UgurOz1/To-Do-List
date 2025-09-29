import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from '../types';
import { useTodoStore } from './todoStore';
import { auth } from '../config/firebase';
import { loginUser, logoutUser, registerUser, mapFirebaseUser } from '../services/authService';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  success: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null, success: null });
    try {
      const userData = await loginUser(email, password);
      set({ user: userData, loading: false, success: 'Başarıyla giriş yaptınız!' });
      useTodoStore.getState().loadUserTodos(userData.uid);
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  register: async (email: string, password: string, firstName: string, lastName: string) => {
    set({ loading: true, error: null, success: null });
    try {
      const userData = await registerUser(email, password, firstName, lastName);
      set({ user: userData, loading: false, success: 'Hesabınız başarıyla oluşturuldu!' });
      useTodoStore.getState().loadUserTodos(userData.uid);
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await logoutUser();
      useTodoStore.getState().clearTodos();
      set({ user: null, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user });
    if (user) {
      useTodoStore.getState().loadUserTodos(user.uid);
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}));

// Firebase auth state değişikliklerini dinle
onAuthStateChanged(auth, async (firebaseUser) => {
  const { setUser } = useAuthStore.getState();
  
  if (firebaseUser) {
    const userData = await mapFirebaseUser(firebaseUser);
    setUser(userData);
  } else {
    setUser(null);
  }
});