import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Project } from '../types';
import { extractErrorMessage } from '../utils/errorMessages';

// Proje ekleme
export const addProject = async (
  name: string,
  description: string,
  color: string,
  icon: string,
  userId: string,
  order: number
): Promise<void> => {
  try {
    await addDoc(collection(db, 'projects'), {
      name,
      description,
      color,
      icon,
      createdAt: Timestamp.now(),
      userId,
      order
    });
  } catch (error: unknown) {
    throw new Error('Proje eklenirken hata oluştu: ' + extractErrorMessage(error));
  }
};

// Proje güncelleme
export const updateProject = async (
  projectId: string,
  updates: Partial<Omit<Project, 'id' | 'createdAt' | 'userId'>>
): Promise<void> => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, updates);
  } catch (error: unknown) {
    throw new Error('Proje güncellenirken hata oluştu: ' + extractErrorMessage(error));
  }
};

// Proje silme (ve ilgili todo'ları da sil)
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    const batch = writeBatch(db);
    
    // Projeyi sil
    const projectRef = doc(db, 'projects', projectId);
    batch.delete(projectRef);
    
    // İlgili todo'ları projectId'sini null yap
    const todosQuery = query(
      collection(db, 'todos'),
      where('projectId', '==', projectId)
    );
    
    const todosSnapshot = await new Promise<any>((resolve, reject) => {
      const unsubscribe = onSnapshot(todosQuery, resolve, reject);
      setTimeout(() => unsubscribe(), 100);
    });
    
    todosSnapshot.forEach((todoDoc: any) => {
      batch.update(todoDoc.ref, { projectId: null });
    });
    
    await batch.commit();
  } catch (error: unknown) {
    throw new Error('Proje silinirken hata oluştu: ' + extractErrorMessage(error));
  }
};

// Kullanıcının projelerini dinleme (real-time)
export const subscribeProjects = (userId: string, callback: (projects: Project[]) => void) => {
  const q = query(
    collection(db, 'projects'),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (querySnapshot) => {
    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        name: data.name,
        description: data.description,
        color: data.color,
        icon: data.icon,
        createdAt: data.createdAt.toDate(),
        userId: data.userId,
        order: data.order || 0
      });
    });
    
    // Order'a göre sırala
    projects.sort((a, b) => a.order - b.order);
    callback(projects);
  });
};

// Proje sırasını güncelle
export const updateProjectOrder = async (projectId: string, newOrder: number): Promise<void> => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, { order: newOrder });
  } catch (error: unknown) {
    throw new Error('Proje sırası güncellenirken hata oluştu: ' + extractErrorMessage(error));
  }
};
