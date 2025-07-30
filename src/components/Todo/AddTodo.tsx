import { useState } from 'react';
import { useTodoStore } from '../../stores/todoStore';
import { useAuthStore } from '../../stores/authStore';

export const AddTodo = () => {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);
  const user = useAuthStore((state) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && user) {
      addTodo(text, user.email); // Kullanıcı email'ini userId olarak kullanıyoruz
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yeni görev ekle..."
          className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Ekle
        </button>
      </div>
    </form>
  );
};