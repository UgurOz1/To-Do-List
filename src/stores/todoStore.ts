import { create } from 'zustand';
import type { Todo } from '../types';
import { addTodo as addTodoService, updateTodo, deleteTodo as deleteTodoService, subscribeTodos } from '../services/todoService';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  unsubscribe: (() => void) | null;
  addTodo: (text: string, userId: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  loadUserTodos: (userId: string) => void;
  clearTodos: () => void;
  clearError: () => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  unsubscribe: null,

  addTodo: async (text: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      await addTodoService(text, userId);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  toggleTodo: async (id: string) => {
    const { todos } = get();
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await updateTodo(id, !todo.completed);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteTodo: async (id: string) => {
    try {
      await deleteTodoService(id);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  loadUserTodos: (userId: string) => {
    const { unsubscribe } = get();
    
    // Önceki dinleyiciyi temizle
    if (unsubscribe) {
      unsubscribe();
    }

    // Yeni dinleyici başlat
    const newUnsubscribe = subscribeTodos(userId, (todos) => {
      set({ todos });
    });

    set({ unsubscribe: newUnsubscribe });
  },

  clearTodos: () => {
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
    }
    set({ todos: [], unsubscribe: null });
  },

  clearError: () => set({ error: null }),
}));