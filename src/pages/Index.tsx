
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Task, TaskFilter as FilterType, TaskPriority } from '@/types/task';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import TaskFilter from '@/components/TaskFilter';

// Load tasks from localStorage
const loadTasks = (): Task[] => {
  const tasksJson = localStorage.getItem('tasks');
  if (tasksJson) {
    try {
      const parsedTasks = JSON.parse(tasksJson);
      // Convert string dates back to Date objects
      return parsedTasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    } catch (error) {
      console.error('Failed to parse tasks from localStorage:', error);
    }
  }
  return [];
};

// Save tasks to localStorage
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks on initial render
  useEffect(() => {
    setTasks(loadTasks());
    setIsLoaded(true);
  }, []);

  // Save tasks when they change
  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  // Calculate task counts for the filter
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  // Add a new task
  const handleAddTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date(),
      priority
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    toast.success('Task added');
  };

  // Toggle task completion status
  const handleToggleComplete = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast.success(task.completed ? 'Task marked as active' : 'Task completed');
    }
  };

  // Delete a task
  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.success('Task deleted');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">Tasks</h1>
          <p className="text-gray-500">Simple task management</p>
        </div>
        
        <div className="mb-6">
          <TaskInput onAddTask={handleAddTask} />
        </div>
        
        <TaskFilter 
          currentFilter={filter} 
          onFilterChange={setFilter} 
          taskCounts={taskCounts}
        />
        
        <div className="bg-white shadow-sm rounded-lg p-5 transition-default">
          <TaskList 
            tasks={tasks} 
            filter={filter}
            onToggleComplete={handleToggleComplete} 
            onDelete={handleDeleteTask} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
