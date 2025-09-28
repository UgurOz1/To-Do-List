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
      addTodo(text, user.email);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Yeni görev ekle..."
            className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 text-sm sm:text-base"
          />
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg font-medium flex items-center justify-center space-x-2"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-sm sm:text-base">Ekle</span>
        </button>
      </div>
    </form>
  );
};