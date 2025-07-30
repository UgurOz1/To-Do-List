import { useAuthStore } from './stores/authStore';
import { LoginForm } from './components/Auth/LoginForm';
import { Layout } from './components/Layout';
import { AddTodo } from './components/Todo/AddTodo';
import { TodoList } from './components/Todo/TodoList';

export const App = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Layout>
      {!user ? (
        <LoginForm />
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Görevlerim</h2>
          <AddTodo />
          <TodoList />
        </div>
      )}
    </Layout>
  );
};