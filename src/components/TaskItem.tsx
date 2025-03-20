
import React from 'react';
import { Task } from '@/types/task';
import { CheckIcon, Trash2Icon } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-rose-100 text-rose-800'
  };

  return (
    <div 
      className={`group p-4 border rounded-lg bg-white shadow-sm mb-2 animate-slide-in hover:shadow-md transition-default ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`h-5 w-5 rounded-full border flex items-center justify-center transition-default ${
              task.completed 
                ? 'bg-primary border-primary text-white' 
                : 'border-gray-300 hover:border-primary/50'
            }`}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed && <CheckIcon className="h-3 w-3" />}
          </button>
          
          <div className="flex-1">
            <p className={`text-sm font-medium transition-default ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-xs text-gray-500">
                {task.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-destructive transition-default opacity-0 group-hover:opacity-100"
          aria-label="Delete task"
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
