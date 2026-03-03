import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
  Timestamp,
  writeBatch,
  getDocs
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
      order,
      isArchived: false
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

    // İlgili todo'ları bul
    const todosQuery = query(
      collection(db, 'todos'),
      where('projectId', '==', projectId)
    );

    const todosSnapshot = await getDocs(todosQuery);

    // Todos'ları güncelle (projectId'sini null yap)
    todosSnapshot.forEach((todoDoc) => {
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
        order: data.order || 0,
        isArchived: data.isArchived || false
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
// Proje arşivle/arşivden çıkar
export const toggleProjectArchive = async (projectId: string, isArchived: boolean): Promise<void> => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, { isArchived });
  } catch (error: unknown) {
    throw new Error(`Proje ${isArchived ? 'arşivlenirken' : 'arşivden çıkarılırken'} hata oluştu: ` + extractErrorMessage(error));
  }
};

// Toplu proje arşivle
export const bulkArchiveProjects = async (projectIds: string[], isArchived: boolean): Promise<void> => {
  try {
    const batch = writeBatch(db);
    projectIds.forEach(id => {
      const projectRef = doc(db, 'projects', id);
      batch.update(projectRef, { isArchived });
    });
    await batch.commit();
  } catch (error: unknown) {
    throw new Error(`Projeler toplu ${isArchived ? 'arşivlenirken' : 'arşivden çıkarılırken'} hata oluştu: ` + extractErrorMessage(error));
  }
};
