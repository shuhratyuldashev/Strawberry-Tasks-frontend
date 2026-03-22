import { api } from '@/api/axios';
import type { Task, TaskPriority, TaskStatus } from '@/types/task';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    inProgressCount: 0,
    todoCount: 0,
    totalCount: 0,
    activeCount: 0,
    completedCount: 0,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        const response = await api.get('/tasks/');
        this.tasks = response.data;  
        this.totalCount = this.tasks.length;
        this.activeCount = this.tasks.filter(t => t.status !== 'done').length;
        this.completedCount = this.tasks.filter(t => t.status === 'done').length;
        this.inProgressCount = this.tasks.filter(t => t.status === 'in-progress').length;
        this.todoCount = this.tasks.filter(t => t.status === 'todo').length;
      } catch (err: any) {
        this.error = 'Ошибка при загрузке задач';
      } finally {
        this.loading = false;
      }
    },

    async addTask(data: { title: string; status: TaskStatus; priority: TaskPriority }) {
      try {
        const newTask = { 
          title: data.title, 
          status: data.status, 
          priority: data.priority 
        };
        console.log("newTask", newTask)
        const response = await api.post('/tasks/', newTask);
        this.tasks.push(response.data); 
      } catch (err) {
        console.error('Не удалось создать задачу');
      }
    },

   async toggleTask(id: number) {
    const task = this.tasks.find(t => t.id === id);
      if (task) {
        try {
          const newStatus = task.status === 'done' ? 'todo' : 'done';
          
          await api.patch(`/tasks/${id}/`, { status: newStatus });
          
          task.status = newStatus;
          
        } catch (err) {
          console.error('Ошибка при переключении статуса:', err);
        }
      }
    },

    async updateTask(id: number, taskData: { status?: TaskStatus; priority?: TaskPriority }) {
      try {
        const response = await api.patch(`/tasks/${id}/`, taskData);
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
      } catch (err) {
        console.error('Ошибка обновления');
      }
    },

    async deleteTask(id: number) {
      try {
        await api.delete(`/tasks/${id}/`);
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (err) {
        console.error('Ошибка удаления');
      }
    },

    countByPriority(priority: TaskPriority) {
      return this.tasks.filter(t => t.priority === priority).length;
    }
  }
});