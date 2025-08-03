import type { Todo } from '../../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 h-6 w-6 rounded-full border-2 transition-all duration-200 ${
              todo.completed
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent'
                : 'border-gray-300 hover:border-blue-400'
            } flex items-center justify-center`}
          >
            {todo.completed && (
              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <span
            className={`flex-1 text-gray-900 transition-all duration-200 ${
              todo.completed 
                ? 'line-through text-gray-500' 
                : 'font-medium'
            }`}
          >
            {todo.text}
          </span>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};