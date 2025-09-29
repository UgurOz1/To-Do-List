export interface User {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}