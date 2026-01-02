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
import type { Todo, Priority, SubTask } from '../types';
import { extractErrorMessage } from '../utils/errorMessages';
import { runTransaction } from 'firebase/firestore';

// Todo ekleme
// Todo ekleme
export const addTodo = async (text: string, userId: string, dueDate: Date | null, priority: Priority): Promise<void> => {
  try {
    await addDoc(collection(db, 'todos'), {
      text,
      completed: false,
      createdAt: Timestamp.now(),
      userId,
      dueDate: dueDate ? Timestamp.fromDate(dueDate) : null,
      priority,
      subTasks: []
    });
  } catch (error: unknown) {
    throw new Error('Todo eklenirken hata oluştu: ' + extractErrorMessage(error));
  }
};

// Todo güncelleme
export const updateTodo = async (todoId: string, completed: boolean): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    await updateDoc(todoRef, { completed });
  } catch (error: unknown) {
    throw new Error('Todo güncellenirken hata oluştu: ' + extractErrorMessage(error));
  }
};

// Todo silme
// Todo silme
export const deleteTodo = async (todoId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'todos', todoId));
  } catch (error: unknown) {
    throw new Error('Todo silinirken hata oluştu: ' + extractErrorMessage(error));
  }
};

// Alt görev ekleme
export const addSubTask = async (todoId: string, text: string): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    const newSubTask: SubTask = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      completed: false
    };

    await runTransaction(db, async (transaction) => {
      const todoDoc = await transaction.get(todoRef);
      if (!todoDoc.exists()) throw new Error("Todo bulunamadı");

      const subTasks = todoDoc.data().subTasks || [];
      subTasks.push(newSubTask);
      transaction.update(todoRef, { subTasks });
    });
  } catch (error: unknown) {
    throw new Error('Alt görev eklenirken hata oluştu: ' + extractErrorMessage(error));
  }
};

// Alt görev durumunu güncelleme
export const toggleSubTask = async (todoId: string, subTaskId: string): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    await runTransaction(db, async (transaction) => {
      const todoDoc = await transaction.get(todoRef);
      if (!todoDoc.exists()) throw new Error("Todo bulunamadı");

      const subTasks = (todoDoc.data().subTasks || []) as SubTask[];
      const updatedSubTasks = subTasks.map(task =>
        task.id === subTaskId ? { ...task, completed: !task.completed } : task
      );

      transaction.update(todoRef, { subTasks: updatedSubTasks });
    });
  } catch (error: unknown) {
    throw new Error('Alt görev güncellenirken hata oluştu: ' + extractErrorMessage(error));
  }
};

// Alt görev silme
export const deleteSubTask = async (todoId: string, subTaskId: string): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    await runTransaction(db, async (transaction) => {
      const todoDoc = await transaction.get(todoRef);
      if (!todoDoc.exists()) throw new Error("Todo bulunamadı");

      const subTasks = (todoDoc.data().subTasks || []) as SubTask[];
      const updatedSubTasks = subTasks.filter(task => task.id !== subTaskId);

      transaction.update(todoRef, { subTasks: updatedSubTasks });
    });
  } catch (error: unknown) {
    throw new Error('Alt görev silinirken hata oluştu: ' + extractErrorMessage(error));
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
        userId: data.userId,
        dueDate: data.dueDate ? data.dueDate.toDate() : null,
        priority: data.priority || 'medium', // Varsayılan değer
        subTasks: data.subTasks || []
      });
    });
    // Tarihe göre sıralama client-side'da yap
    todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    callback(todos);
  });
};