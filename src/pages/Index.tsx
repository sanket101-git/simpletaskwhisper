
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Task, TaskFilter as FilterType, TaskPriority } from '@/types/task';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import TaskFilter from '@/components/TaskFilter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ListTodoIcon, ClipboardCheckIcon } from 'lucide-react';

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header section with image */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
            <p className="text-gray-600 max-w-md">Organize your day, boost productivity, and never miss a deadline again.</p>
          </div>
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=400&q=80" 
              alt="Task Management" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-lg p-5 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-primary/10 p-3 rounded-full inline-block mb-2">
                <ListTodoIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Active Tasks</h3>
              <p className="text-3xl font-bold text-primary">{taskCounts.active}</p>
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-5 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-2">
                <ClipboardCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Completed Tasks</h3>
              <p className="text-3xl font-bold text-blue-600">{taskCounts.completed}</p>
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-5 flex items-center justify-center">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Productivity" 
                className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold">Total Tasks</h3>
              <p className="text-3xl font-bold text-indigo-600">{taskCounts.all}</p>
            </div>
          </div>
        </div>
        
        <Card className="glass-effect border-none mb-8">
          <CardHeader className="pb-3">
            <h2 className="text-xl font-semibold">Add New Task</h2>
          </CardHeader>
          <CardContent>
            <TaskInput onAddTask={handleAddTask} />
          </CardContent>
        </Card>
        
        <TaskFilter 
          currentFilter={filter} 
          onFilterChange={setFilter} 
          taskCounts={taskCounts}
        />
        
        <Card className="glass-effect border-none">
          <CardContent className="p-6">
            <TaskList 
              tasks={tasks} 
              filter={filter}
              onToggleComplete={handleToggleComplete} 
              onDelete={handleDeleteTask} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
