export interface User {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
}

export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export type Priority = 'low' | 'medium' | 'high';

export type TodoTag = 'bug' | 'idea' | 'feature' | 'note';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
  dueDate: Date | null;
  priority: Priority;
  subTasks: SubTask[];
  projectId: string | null;
  tags: TodoTag[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdAt: Date;
  userId: string;
  order: number;
  isArchived?: boolean;
}