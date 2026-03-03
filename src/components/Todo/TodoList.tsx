import { useState, useMemo } from 'react';
import { useTodoStore } from '../../stores/todoStore';
import { useProjectStore } from '../../stores/projectStore';
import { TodoItem } from './TodoItem';
import type { TodoTag } from '../../types';

type SortType = 'createdDesc' | 'createdAsc' | 'priorityHigh' | 'priorityLow' | 'dueDateNear' | 'dueDateFar';

export const TodoList = () => {
  const { todos, loading, error } = useTodoStore();
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const { selectedProjectId } = useProjectStore();
  const [sortType, setSortType] = useState<SortType>('createdDesc');
  const [filterTag, setFilterTag] = useState<TodoTag | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos;

    // Proje filtresi
    if (selectedProjectId) {
      filtered = filtered.filter(todo => todo.projectId === selectedProjectId);
    } else {
      filtered = filtered.filter(todo => !todo.projectId);
    }

    // Tag filtresi
    if (filterTag !== 'all') {
      filtered = filtered.filter(todo => todo.tags?.includes(filterTag));
    }

    // Tamamlanmış görevler filtresi
    if (!showCompleted) {
      filtered = filtered.filter(todo => !todo.completed);
    }

    // Sıralama
    return [...filtered].sort((a, b) => {
      switch (sortType) {
        case 'createdDesc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'createdAsc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'priorityHigh': {
          const pMap = { high: 3, medium: 2, low: 1 };
          return pMap[b.priority] - pMap[a.priority];
        }
        case 'priorityLow': {
          const pMap = { high: 3, medium: 2, low: 1 };
          return pMap[a.priority] - pMap[b.priority];
        }
        case 'dueDateNear': {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        case 'dueDateFar': {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }
        default:
          return 0;
      }
    });
  }, [todos, sortType, selectedProjectId, filterTag, showCompleted]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-500 mt-2">Görevler yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-red-900 mb-2">Hata oluştu</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Sort Dropdown */}
          <div className="relative flex-1">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value as SortType)}
              className="w-full appearance-none bg-white/50 backdrop-blur-sm border border-white/40 pl-4 pr-10 py-2 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer hover:bg-white/70 transition-all"
            >
              <option value="createdDesc">📅 En Yeni</option>
              <option value="createdAsc">📅 En Eski</option>
              <option value="priorityHigh">🚨 Öncelik (Yüksek-Düşük)</option>
              <option value="priorityLow">🚨 Öncelik (Düşük-Yüksek)</option>
              <option value="dueDateNear">⏰ Son Tarih (Yakın)</option>
              <option value="dueDateFar">⏰ Son Tarih (Uzak)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Tag Filter */}
          <div className="relative flex-1">
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value as TodoTag | 'all')}
              className="w-full appearance-none bg-white/50 backdrop-blur-sm border border-white/40 pl-4 pr-10 py-2 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer hover:bg-white/70 transition-all"
            >
              <option value="all">🏷️ Tüm Etiketler</option>
              <option value="bug">🐛 Hatalar</option>
              <option value="idea">💡 Fikirler</option>
              <option value="feature">✨ Özellikler</option>
              <option value="note">📝 Notlar</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Show Completed Toggle */}
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              showCompleted
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showCompleted ? '✓ Tamamlananlar' : '○ Tamamlananlar'}
          </button>
        </div>
      )}

      {filteredAndSortedTodos.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz görev yok</h3>
          <p className="text-gray-500">Yukarıdaki formu kullanarak ilk görevinizi ekleyin</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAndSortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};