import { create } from 'zustand';
import type { Todo, Priority } from '../types';
import {
  addTodo as addTodoService,
  updateTodo,
  deleteTodo as deleteTodoService,
  subscribeTodos,
  addSubTask as addSubTaskService,
  toggleSubTask as toggleSubTaskService,
  deleteSubTask as deleteSubTaskService
} from '../services/todoService';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  unsubscribe: (() => void) | null;
  addTodo: (text: string, userId: string, dueDate: Date | null, priority: Priority) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  addSubTask: (todoId: string, text: string) => Promise<void>;
  toggleSubTask: (todoId: string, subTaskId: string) => Promise<void>;
  deleteSubTask: (todoId: string, subTaskId: string) => Promise<void>;
  loadUserTodos: (userId: string) => void;
  clearTodos: () => void;
  clearError: () => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  unsubscribe: null,

  addTodo: async (text: string, userId: string, dueDate: Date | null, priority: Priority) => {
    set({ loading: true, error: null });
    try {
      await addTodoService(text, userId, dueDate, priority);
      set({ loading: false });
    } catch (error: unknown) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  toggleTodo: async (id: string) => {
    const { todos } = get();
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await updateTodo(id, !todo.completed);
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  deleteTodo: async (id: string) => {
    try {
      await deleteTodoService(id);
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  addSubTask: async (todoId: string, text: string) => {
    try {
      await addSubTaskService(todoId, text);
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  toggleSubTask: async (todoId: string, subTaskId: string) => {
    try {
      await toggleSubTaskService(todoId, subTaskId);
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  deleteSubTask: async (todoId: string, subTaskId: string) => {
    try {
      await deleteSubTaskService(todoId, subTaskId);
    } catch (error: unknown) {
      set({ error: (error as Error).message });
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