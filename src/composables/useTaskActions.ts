import { ref } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import type { Task, TaskCreateInput, TaskStatus, TaskPriority } from '@/types/task'

export function useTaskActions() {
  const store = useTaskStore()

  const editingTask = ref<Task | null>(null)
  const showForm = ref<boolean>(false)
  const confirmDeleteId = ref<number | null>(null)

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

  function deleteTask(id: number): void {
    store.deleteTask(id)
    confirmDeleteId.value = null
  }

 function changeStatus(id: number, status: TaskStatus): void {
  store.updateTask(id, { status })
  }

  function changePriority(id: number, priority: TaskPriority): void {
    store.updateTask(id, { priority })
  }

  function toggleTask(id: number): void {
    console.log("ID", id)
    store.toggleTask(id)
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
    toggleTask,
  }
}
