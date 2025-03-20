
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
      <div className="py-8 text-center animate-fade-in">
        <p className="text-gray-500">
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
    <div className="space-y-2">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
