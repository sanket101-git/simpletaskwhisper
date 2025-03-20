
import React from 'react';
import { TaskFilter as FilterType } from '@/types/task';
import { CheckCircle2Icon, CircleIcon, ListIcon } from 'lucide-react';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ 
  currentFilter, 
  onFilterChange,
  taskCounts 
}) => {
  const filters: { value: FilterType; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All Tasks', icon: <ListIcon className="h-4 w-4" /> },
    { value: 'active', label: 'Active', icon: <CircleIcon className="h-4 w-4" /> },
    { value: 'completed', label: 'Completed', icon: <CheckCircle2Icon className="h-4 w-4" /> }
  ];

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex p-1.5 glass-effect rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2.5 text-sm rounded-md transition-default flex items-center space-x-1.5 ${
              currentFilter === filter.value 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter.icon}
            <span>{filter.label}</span>
            {taskCounts[filter.value] > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full inline-flex items-center justify-center ${
                currentFilter === filter.value 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {taskCounts[filter.value]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
