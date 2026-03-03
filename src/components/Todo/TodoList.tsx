import { useState, useMemo } from 'react';
import { useTodoStore } from '../../stores/todoStore';
import { useProjectStore } from '../../stores/projectStore';
import { TodoItem } from './TodoItem';
import type { TodoTag } from '../../types';

type SortType = 'createdDesc' | 'createdAsc' | 'priorityHigh' | 'priorityLow' | 'dueDateNear' | 'dueDateFar';

export const TodoList = () => {
  const { todos, loading, error, bulkDeleteTodos, bulkToggleTodos, bulkUpdateProject } = useTodoStore();
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const { selectedProjectId, projects } = useProjectStore();
  const [sortType, setSortType] = useState<SortType>('createdDesc');
  const [filterTag, setFilterTag] = useState<TodoTag | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  // Toplu işlem stateleri
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkProjectMenu, setShowBulkProjectMenu] = useState(false);

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

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredAndSortedTodos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAndSortedTodos.map(todo => todo.id));
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`${selectedIds.length} görevi silmek istediğinize emin misiniz?`)) {
      await bulkDeleteTodos(selectedIds);
      setSelectedIds([]);
      setIsSelectionMode(false);
    }
  };

  const handleBulkToggle = async (completed: boolean) => {
    await bulkToggleTodos(selectedIds, completed);
    setSelectedIds([]);
    setIsSelectionMode(false);
  };

  const handleBulkProjectChange = async (projectId: string | null) => {
    await bulkUpdateProject(selectedIds, projectId);
    setSelectedIds([]);
    setIsSelectionMode(false);
    setShowBulkProjectMenu(false);
  };

  const toggleSelectionMode = () => {
    if (isSelectionMode) {
      setSelectedIds([]);
    }
    setIsSelectionMode(!isSelectionMode);
  };

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
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${showCompleted
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {showCompleted ? '✓ Tamamlananlar' : '○ Tamamlananlar'}
          </button>

          {/* Selection Mode Toggle */}
          <button
            onClick={toggleSelectionMode}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isSelectionMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
          >
            {isSelectionMode ? 'İptal' : 'Çoklu Seçim'}
          </button>
        </div>
      )}

      {/* Select All & Bulk Actions Bar */}
      {isSelectionMode && filteredAndSortedTodos.length > 0 && (
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-blue-100 mb-4 shadow-sm animate-fade-in sticky top-[72px] z-30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-2">
            {/* Left: Selection Info */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={handleSelectAll}
                className={`flex-shrink-0 h-6 w-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${selectedIds.length === filteredAndSortedTodos.length && filteredAndSortedTodos.length > 0
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300 bg-white hover:border-blue-400'
                  }`}
              >
                {selectedIds.length === filteredAndSortedTodos.length && filteredAndSortedTodos.length > 0 && (
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">
                  {selectedIds.length} / {filteredAndSortedTodos.length} Seçildi
                </span>
                {selectedIds.length > 0 && (
                  <button
                    onClick={() => setSelectedIds([])}
                    className="text-[10px] text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wider text-left"
                  >
                    Seçimi Temizle
                  </button>
                )}
              </div>
            </div>

            {/* Right: Actions (Only show if items selected) */}
            <div className={`flex items-center gap-1.5 w-full md:w-auto transition-all duration-300 ${selectedIds.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

              <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                <button
                  onClick={() => handleBulkToggle(true)}
                  className="flex-1 md:flex-none flex items-center justify-center space-x-1 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white px-3 py-2 rounded-xl transition-all border border-green-100 text-xs font-bold"
                  title="Tamamla"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="hidden sm:inline">Tamamla</span>
                </button>

                <button
                  onClick={() => handleBulkToggle(false)}
                  className="flex-1 md:flex-none flex items-center justify-center space-x-1 bg-gray-50 text-gray-600 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-xl transition-all border border-gray-200 text-xs font-bold"
                  title="Geri Al"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Geri Al</span>
                </button>

                <div className="relative flex-1 md:flex-none">
                  <button
                    onClick={() => setShowBulkProjectMenu(!showBulkProjectMenu)}
                    className={`w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-xl transition-all border text-xs font-bold ${showBulkProjectMenu
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-600 hover:text-white'
                      }`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Taşı</span>
                  </button>

                  {showBulkProjectMenu && (
                    <div className="absolute top-full mt-2 right-0 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in max-h-60 overflow-y-auto">
                      <button
                        onClick={() => handleBulkProjectChange(null)}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium"
                      >
                        <span>📋</span>
                        <span>Projesiz</span>
                      </button>
                      {projects.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => handleBulkProjectChange(project.id)}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium"
                        >
                          <span>{project.icon}</span>
                          <span className="truncate">{project.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleBulkDelete}
                  className="flex-1 md:flex-none flex items-center justify-center space-x-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-xl transition-all border border-red-100 text-xs font-bold"
                  title="Sil"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Sil</span>
                </button>
              </div>
            </div>
          </div>
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
              isSelectionMode={isSelectionMode}
              isSelected={selectedIds.includes(todo.id)}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};