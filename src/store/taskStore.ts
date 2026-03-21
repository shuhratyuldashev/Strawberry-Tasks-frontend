import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, TaskCreateInput, TaskUpdateInput, TaskPriority } from '@/types/task'

const fakeData: Task[] = [
  {
    id: '1',
    title: 'Design new onboarding flow',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Fix login page validation bug',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '3',
    title: 'Write API documentation',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: '4',
    title: 'Set up CI/CD pipeline',
    status: 'done',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '5',
    title: 'Conduct user research interviews',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: '6',
    title: 'Optimize database queries',
    status: 'todo',
    priority: 'low',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: '7',
    title: 'Update dependencies',
    status: 'done',
    priority: 'low',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: '8',
    title: 'Create email notification templates',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
]

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([...fakeData])
  const nextId = ref<number>(fakeData.length + 1)

  function addTask(input: TaskCreateInput): void {
    const task: Task = {
      ...input,
      id: String(nextId.value++),
      createdAt: new Date().toISOString(),
    }
    tasks.value.unshift(task)
  }

  function updateTask(id: string, updates: TaskUpdateInput): void {
    const idx = tasks.value.findIndex((t) => t.id === id)
    if (idx !== -1) {
      tasks.value[idx] = { ...tasks.value[idx], ...updates }
    }
  }

  function deleteTask(id: string): void {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function toggleComplete(id: string): void {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.status = task.status === 'done' ? 'todo' : 'done'
    }
  }

  function clearAll(): void {
    tasks.value = []
  }

  const totalCount = computed<number>(() => tasks.value.length)
  const completedCount = computed<number>(() => tasks.value.filter((t) => t.status === 'done').length)
  const activeCount = computed<number>(() => tasks.value.filter((t) => t.status !== 'done').length)
  const inProgressCount = computed<number>(() => tasks.value.filter((t) => t.status === 'in-progress').length)
  const todoCount = computed<number>(() => tasks.value.filter((t) => t.status === 'todo').length)

  function countByPriority(p: TaskPriority): number {
    return tasks.value.filter((t) => t.priority === p).length
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearAll,
    totalCount,
    completedCount,
    activeCount,
    inProgressCount,
    todoCount,
    countByPriority,
  }
})
