import { create } from 'zustand';
import type { User } from '../types';
import { useTodoStore } from './todoStore';

interface AuthState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (userData) => {
    set({ user: userData });
    useTodoStore.getState().loadUserTodos(userData.email); // Email'i userId olarak kullanıyoruz
  },
  logout: () => {
    useTodoStore.getState().clearTodos();
    set({ user: null });
  },
}));