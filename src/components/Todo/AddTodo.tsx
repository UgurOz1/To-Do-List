import { useState } from 'react';
import { useTodoStore } from '../../stores/todoStore';
import { useAuthStore } from '../../stores/authStore';
import { useProjectStore } from '../../stores/projectStore';
import type { Priority, TodoTag } from '../../types';

const TAG_OPTIONS: { value: TodoTag; label: string; icon: string; color: string }[] = [
  { value: 'bug', label: 'Hata', icon: '🐛', color: 'bg-red-100 text-red-700 border-red-200' },
  { value: 'idea', label: 'Fikir', icon: '💡', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'feature', label: 'Özellik', icon: '✨', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'note', label: 'Not', icon: '📝', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

export const AddTodo = () => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [selectedTags, setSelectedTags] = useState<TodoTag[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const addTodo = useTodoStore((state) => state.addTodo);
  const user = useAuthStore((state) => state.user);
  const { selectedProjectId } = useProjectStore();

  const toggleTag = (tag: TodoTag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && user) {
      await addTodo(
        text,
        user.uid,
        dueDate ? new Date(dueDate) : null,
        priority,
        selectedProjectId,
        selectedTags
      );
      setText('');
      setDueDate('');
      setPriority('medium');
      setSelectedTags([]);
      setShowAdvanced(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div className="flex flex-col space-y-4 bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-xl transition-all hover:shadow-2xl hover:bg-white/70">

        {/* Text Input Area */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ne yapılması gerekiyor?"
            className="block w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-gray-900 placeholder-gray-500 text-base transition-all duration-200"
          />
        </div>

        {/* Tags Selection */}
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag.value}
              type="button"
              onClick={() => toggleTag(tag.value)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg border transition-all ${
                selectedTags.includes(tag.value)
                  ? tag.color + ' ring-2 ring-offset-1 ring-current'
                  : 'bg-white/50 text-gray-600 border-gray-200 hover:bg-white'
              }`}
            >
              <span>{tag.icon}</span>
              <span className="text-sm font-medium">{tag.label}</span>
            </button>
          ))}
        </div>

        {/* Toggle Advanced Options */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>{showAdvanced ? 'Daha Az Seçenek' : 'Daha Fazla Seçenek'}</span>
          <svg
            className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-200">
            {/* Date Picker */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-gray-700 text-sm transition-all duration-200"
              />
            </div>

            {/* Priority Selector */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className={`block w-full pl-10 pr-8 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-gray-700 text-sm appearance-none cursor-pointer transition-all duration-200 ${priority === 'high' ? 'text-red-600 font-medium' :
                    priority === 'medium' ? 'text-orange-600 font-medium' :
                      'text-green-600 font-medium'
                  }`}
              >
                <option value="low" className="text-gray-700">🟢 Düşük Öncelik</option>
                <option value="medium" className="text-gray-700">🟠 Orta Öncelik</option>
                <option value="high" className="text-gray-700">🔴 Yüksek Öncelik</option>
              </select>
            </div>
          </div>
        )}

        {/* Add Button */}
        <button
          type="submit"
          disabled={!text.trim()}
          className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg font-medium flex items-center justify-center space-x-2"
        >
          <span>Görev Oluştur</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </form>
  );
};
