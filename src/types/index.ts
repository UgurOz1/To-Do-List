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

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
  dueDate: Date | null;
  priority: Priority;
  subTasks: SubTask[];
}