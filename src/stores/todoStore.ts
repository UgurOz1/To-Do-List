import { create } from 'zustand';
import type { Todo } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';

// TodoState arayüzü store'un yapısını tanımlar
interface TodoState {
  todos: Todo[]; // Todo listesi
  addTodo: (text: string, userId: string) => void; // Yeni todo ekleme
  toggleTodo: (id: string, userId: string) => void; // Todo durumunu değiştirme
  deleteTodo: (id: string, userId: string) => void; // Todo silme
  loadUserTodos: (userId: string) => void; // Kullanıcının todo'larını yükleme
  clearTodos: () => void; // Tüm todo'ları temizleme
}

export const useTodoStore = create<TodoState>((set) => ({
  // Başlangıç state'i - boş todo listesi
  todos: [],
  
  addTodo: (text, userId) =>
    set((state) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false, // Varsayılan olarak tamamlanmamış
        createdAt: new Date(), // Oluşturulma tarihi
        userId, // Kullanıcı ilişkilendirmesi
      };
      const newTodos = [...state.todos, newTodo];
      setStorageItem(`todos_${userId}`, newTodos); // localStorage'a kaydet
      return { todos: newTodos }; // State'i güncelle
    }),

  /**
   * Todo'nun tamamlanma durumunu değiştirir
   * @param id - Değiştirilecek todo ID'si
   * @param userId - Kullanıcı ID'si
   */
  toggleTodo: (id, userId) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setStorageItem(`todos_${userId}`, newTodos); // localStorage'a kaydet
      return { todos: newTodos }; // State'i güncelle
    }),

  /**
   * Todo siler
   * @param id - Silinecek todo ID'si
   * @param userId - Kullanıcı ID'si
   */
  deleteTodo: (id, userId) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      setStorageItem(`todos_${userId}`, newTodos); // localStorage'a kaydet
      return { todos: newTodos }; // State'i güncelle
    }),

  loadUserTodos: (userId) => {
    const userTodos = getStorageItem<Todo[]>(`todos_${userId}`) || []; // localStorage'dan oku
    set({ todos: userTodos }); // State'i güncelle
  },

  /**
   * Tüm todo'ları temizler (state'den ve localStorage'dan)
   */
  clearTodos: () => set({ todos: [] }),
}));