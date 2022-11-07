export interface Task {
  taskName: string;
  taskId: string;
}

export interface TaskSection {
  id: string;
  taskSectionName: string;
  tasks: string[];
  author: string;
  collaborators: string[];
  createdAt: { seconds: number };
}
