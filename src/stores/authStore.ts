import { create } from 'zustand';
import type { User } from '../types'; // Kullanıcı tipi
import { useTodoStore } from './todoStore'; // Todo yönetim store'u

// AuthState arayüzü store'un yapısını tanımlar
interface AuthState {
  user: User | null; // Giriş yapan kullanıcı bilgisi (null ise giriş yapılmamış)
  login: (userData: User) => void; // Kullanıcı girişi yapar
  logout: () => void; // Kullanıcı çıkışı yapar
}

export const useAuthStore = create<AuthState>((set) => ({
  // Başlangıç state'i - giriş yapılmamış durum
  user: null,
  
  login: (userData) => {
    // Kullanıcı bilgisini state'e kaydet
    set({ user: userData });
    
    // Kullanıcının todo'larını yükle (email adresini userId olarak kullanıyoruz)
    useTodoStore.getState().loadUserTodos(userData.email);
  },

  /**
   * Kullanıcı çıkışı yapar ve todo'ları temizler
   */
  logout: () => {
    // Todo store'daki verileri temizle
    useTodoStore.getState().clearTodos();
    
    // Kullanıcı bilgisini state'den kaldır
    set({ user: null });
  },
}));