import { create } from 'zustand';
import type { Project } from '../types';
import {
  addProject as addProjectService,
  updateProject,
  deleteProject as deleteProjectService,
  subscribeProjects,
  updateProjectOrder
} from '../services/projectService';

interface ProjectState {
  projects: Project[];
  selectedProjectId: string | null;
  loading: boolean;
  error: string | null;
  unsubscribe: (() => void) | null;
  addProject: (name: string, description: string, color: string, icon: string, userId: string) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Omit<Project, 'id' | 'createdAt' | 'userId'>>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  setSelectedProject: (projectId: string | null) => void;
  loadUserProjects: (userId: string) => void;
  clearProjects: () => void;
  clearError: () => void;
  reorderProjects: (projectId: string, newOrder: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  selectedProjectId: null,
  loading: false,
  error: null,
  unsubscribe: null,

  addProject: async (name: string, description: string, color: string, icon: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      const { projects } = get();
      const order = projects.length;
      await addProjectService(name, description, color, icon, userId, order);
      set({ loading: false });
    } catch (error: unknown) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateProject: async (projectId: string, updates: Partial<Omit<Project, 'id' | 'createdAt' | 'userId'>>) => {
    try {
      await updateProject(projectId, updates);
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      await deleteProjectService(projectId);
      const { selectedProjectId } = get();
      if (selectedProjectId === projectId) {
        set({ selectedProjectId: null });
      }
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  },

  setSelectedProject: (projectId: string | null) => {
    set({ selectedProjectId: projectId });
  },

  loadUserProjects: (userId: string) => {
    const { unsubscribe } = get();

    if (unsubscribe) {
      unsubscribe();
    }

    const newUnsubscribe = subscribeProjects(userId, (projects) => {
      set({ projects });
    });

    set({ unsubscribe: newUnsubscribe });
  },

  clearProjects: () => {
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
    }
    set({ projects: [], selectedProjectId: null, unsubscribe: null });
  },

  clearError: () => set({ error: null }),

  reorderProjects: async (projectId: string, newOrder: number) => {
    try {
      await updateProjectOrder(projectId, newOrder);
    } catch (error: unknown) {
      set({ error: (error as Error).message });
    }
  }
}));
