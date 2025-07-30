import { useTodoStore } from '../../stores/todoStore';
import { useAuthStore } from '../../stores/authStore';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-gray-500">Henüz görev eklenmedi.</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => user && toggleTodo(todo.id, user.email)}
              onDelete={() => user && deleteTodo(todo.id, user.email)}
            />
          ))}
        </div>
      )}
    </div>
  );
};