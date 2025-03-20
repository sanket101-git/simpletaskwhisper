
import React from 'react';
import { Task, TaskFilter } from '@/types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  filter: TaskFilter;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  filter,
  onToggleComplete, 
  onDelete 
}) => {
  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="py-12 text-center animate-fade-in glass-effect rounded-lg">
        <div className="flex justify-center mb-4">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=150&q=80" 
            alt="Empty task list" 
            className="w-32 h-24 object-cover rounded-lg opacity-50"
          />
        </div>
        <p className="text-gray-500 font-medium">
          {filter === 'all' 
            ? 'No tasks yet. Add one above!' 
            : filter === 'active' 
              ? 'No active tasks. Good job!' 
              : 'No completed tasks yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <div key={task.id} className="animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <TaskItem
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
