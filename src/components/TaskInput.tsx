
import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
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
            placeholder="Add a new task..."
            className="w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-primary/30 transition-default"
            autoFocus
          />
        </div>
        
        <div className="flex space-x-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="px-3 py-3 border rounded-lg bg-white text-sm transition-default"
            aria-label="Task priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <button
            type="submit"
            className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-default flex items-center justify-center"
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
