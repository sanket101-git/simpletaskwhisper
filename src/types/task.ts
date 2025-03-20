
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: TaskPriority;
}

export type TaskFilter = 'all' | 'active' | 'completed';
