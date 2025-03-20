
import React, { useState } from 'react';
import { PlusIcon, ArrowDownIcon } from 'lucide-react';
import { TaskPriority } from '@/types/task';

interface TaskInputProps {
  onAddTask: (title: string, priority: TaskPriority) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      onAddTask(title.trim(), priority);
      setTitle('');
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low Priority 🔹' },
    { value: 'medium', label: 'Medium Priority 🔸' },
    { value: 'high', label: 'High Priority 🔺' },
  ];

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full animate-fade-in"
    >
      <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do today?"
            className="w-full px-4 py-3 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary transition-default"
            autoFocus
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="pl-3 pr-8 py-3 border rounded-lg text-sm transition-default appearance-none"
              aria-label="Task priority"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ArrowDownIcon className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
          
          <button
            type="submit"
            className="px-5 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-default flex items-center justify-center"
            aria-label="Add task"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
