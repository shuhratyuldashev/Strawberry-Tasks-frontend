import { ref } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import type { Task, TaskCreateInput, TaskStatus, TaskPriority } from '@/types/task'

export function useTaskActions() {
  const store = useTaskStore()

  const editingTask = ref<Task | null>(null)
  const showForm = ref<boolean>(false)
  const confirmDeleteId = ref<string | null>(null)

  function openCreateForm(): void {
    editingTask.value = null
    showForm.value = true
  }

  function openEditForm(task: Task): void {
    editingTask.value = { ...task }
    showForm.value = true
  }

  function closeForm(): void {
    showForm.value = false
    editingTask.value = null
  }

  function saveTask(data: TaskCreateInput): void {
    if (editingTask.value) {
      store.updateTask(editingTask.value.id, data)
    } else {
      store.addTask(data)
    }
    closeForm()
  }

  function deleteTask(id: string): void {
    store.deleteTask(id)
    confirmDeleteId.value = null
  }

  function changeStatus(id: string, status: TaskStatus): void {
    store.updateTask(id, { status })
  }

  function changePriority(id: string, priority: TaskPriority): void {
    store.updateTask(id, { priority })
  }

  function toggleComplete(id: string): void {
    store.toggleComplete(id)
  }

  return {
    editingTask,
    showForm,
    confirmDeleteId,
    openCreateForm,
    openEditForm,
    closeForm,
    saveTask,
    deleteTask,
    changeStatus,
    changePriority,
    toggleComplete,
  }
}
