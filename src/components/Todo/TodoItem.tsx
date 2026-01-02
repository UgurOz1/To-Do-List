import { useState } from 'react';
import { useTodoStore } from '../../stores/todoStore';
import type { Todo, Priority } from '../../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const colors = {
    high: 'bg-red-50 text-red-700 border-red-100',
    medium: 'bg-orange-50 text-orange-700 border-orange-100',
    low: 'bg-green-50 text-green-700 border-green-100'
  };

  const labels = {
    high: 'Yüksek',
    medium: 'Orta',
    low: 'Düşük'
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${colors[priority]}`}>
      {labels[priority]}
    </span>
  );
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubTask, setNewSubTask] = useState('');

  const addSubTask = useTodoStore(state => state.addSubTask);
  const toggleSubTask = useTodoStore(state => state.toggleSubTask);
  const deleteSubTask = useTodoStore(state => state.deleteSubTask);

  const handleAddSubTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubTask.trim()) {
      await addSubTask(todo.id, newSubTask);
      setNewSubTask('');
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short'
    }).format(new Date(date));
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  // Alt görevlerin tamamlanma durumuna göre progress bar
  const completedSubTasks = todo.subTasks?.filter(t => t.completed).length || 0;
  const totalSubTasks = todo.subTasks?.length || 0;
  const progress = totalSubTasks === 0 ? 0 : Math.round((completedSubTasks / totalSubTasks) * 100);

  return (
    <div className={`group bg-white/60 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${isExpanded ? 'shadow-md border-blue-200 bg-white/90' : 'border-white/30 shadow-sm hover:shadow-md hover:bg-white/80'}`}>
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          {/* Checkbox ve Text */}
          <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
            <button
              onClick={() => onToggle(todo.id)}
              className={`mt-1 flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 transition-all duration-200 ${todo.completed
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent'
                  : 'border-gray-300 hover:border-blue-400'
                } flex items-center justify-center`}
            >
              {todo.completed && (
                <svg className="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`text-gray-900 transition-all duration-200 text-sm sm:text-base break-words font-medium ${todo.completed ? 'line-through text-gray-500' : ''
                    }`}
                >
                  {todo.text}
                </span>
                <PriorityBadge priority={todo.priority} />
                {todo.dueDate && (
                  <span className={`flex items-center text-xs px-2 py-0.5 rounded-md border ${isOverdue
                      ? 'bg-red-50 text-red-600 border-red-100'
                      : 'bg-gray-50 text-gray-600 border-gray-100'
                    }`}>
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(todo.dueDate)}
                  </span>
                )}
              </div>

              {/* Progress Bar (varsa) */}
              {totalSubTasks > 0 && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{completedSubTasks}/{totalSubTasks}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ${isExpanded ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <svg
                className={`h-5 w-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Subtasks Section */}
        {isExpanded && (
          <div className="mt-4 pl-4 sm:pl-10 space-y-3 border-t border-gray-100 pt-3 animation-fade-in">
            {/* Subtask List */}
            {todo.subTasks?.length > 0 && (
              <div className="space-y-2">
                {todo.subTasks.map((subTask) => (
                  <div key={subTask.id} className="flex items-center justify-between group/sub">
                    <div className="flex items-center space-x-3 flex-1">
                      <button
                        onClick={() => toggleSubTask(todo.id, subTask.id)}
                        className={`h-4 w-4 rounded border transition-colors ${subTask.completed
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-gray-300 hover:border-blue-400'
                          } flex items-center justify-center`}
                      >
                        {subTask.completed && (
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <span className={`text-sm ${subTask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {subTask.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteSubTask(todo.id, subTask.id)}
                      className="opacity-0 group-hover/sub:opacity-100 p-1 text-red-400 hover:text-red-600 transition-opacity"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Subtask Input */}
            <form onSubmit={handleAddSubTask} className="flex items-center space-x-2">
              <input
                type="text"
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
                placeholder="Alt görev ekle..."
                className="flex-1 bg-gray-50 border-transparent focus:bg-white focus:border-blue-300 focus:ring-0 rounded-lg text-sm px-3 py-1.5 transition-all outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!newSubTask.trim()}
                className="text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 p-1.5 rounded-lg transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};