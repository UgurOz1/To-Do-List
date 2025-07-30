import { create } from 'zustand';
import type { Todo } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface TodoState {
  todos: Todo[];
  addTodo: (text: string, userId: string) => void;
  toggleTodo: (id: string, userId: string) => void;
  deleteTodo: (id: string, userId: string) => void;
  loadUserTodos: (userId: string) => void;
  clearTodos: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (text, userId) =>
    set((state) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date(),
        userId, // Kullanıcıya özel todo
      };
      const newTodos = [...state.todos, newTodo];
      setStorageItem(`todos_${userId}`, newTodos);
      return { todos: newTodos };
    }),
  toggleTodo: (id, userId) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setStorageItem(`todos_${userId}`, newTodos);
      return { todos: newTodos };
    }),
  deleteTodo: (id, userId) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      setStorageItem(`todos_${userId}`, newTodos);
      return { todos: newTodos };
    }),
  loadUserTodos: (userId) => {
    const userTodos = getStorageItem<Todo[]>(`todos_${userId}`) || [];
    set({ todos: userTodos });
  },
  clearTodos: () => set({ todos: [] }),
}));