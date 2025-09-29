import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Todo } from '../types';

// Todo ekleme
export const addTodo = async (text: string, userId: string): Promise<void> => {
  try {
    await addDoc(collection(db, 'todos'), {
      text,
      completed: false,
      createdAt: Timestamp.now(),
      userId
    });
  } catch (error: any) {
    throw new Error('Todo eklenirken hata oluştu: ' + error.message);
  }
};

// Todo güncelleme
export const updateTodo = async (todoId: string, completed: boolean): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    await updateDoc(todoRef, { completed });
  } catch (error: any) {
    throw new Error('Todo güncellenirken hata oluştu: ' + error.message);
  }
};

// Todo silme
export const deleteTodo = async (todoId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'todos', todoId));
  } catch (error: any) {
    throw new Error('Todo silinirken hata oluştu: ' + error.message);
  }
};

// Kullanıcının todo'larını dinleme (real-time) - basit sürüm
export const subscribeTodos = (userId: string, callback: (todos: Todo[]) => void) => {
  const q = query(
    collection(db, 'todos'),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (querySnapshot) => {
    const todos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      todos.push({
        id: doc.id,
        text: data.text,
        completed: data.completed,
        createdAt: data.createdAt.toDate(),
        userId: data.userId
      });
    });
    // Tarihe göre sıralama client-side'da yap
    todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    callback(todos);
  });
};