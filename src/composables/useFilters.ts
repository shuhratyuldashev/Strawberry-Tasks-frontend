import { ref, computed } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import type { TaskStatus, TaskPriority, SortOption, ViewOption } from '@/types/task'

const PRIORITY_ORDER: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 }

export function useFilters() {
  const store = useTaskStore()

  const searchQuery = ref<string>('')
  const statusFilter = ref<TaskStatus | 'all'>('all')
  const priorityFilter = ref<TaskPriority | 'all'>('all')
  const sortBy = ref<SortOption>('newest')

  const filteredTasks = computed(() => {
    let list = [...store.tasks]

    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q)       
      )
    }

    if (statusFilter.value !== 'all') {
      list = list.filter((t) => t.status === statusFilter.value)
    }

    if (priorityFilter.value !== 'all') {
      list = list.filter((t) => t.priority === priorityFilter.value)
    }

    list.sort((a, b) => {
      if (sortBy.value === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy.value === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy.value === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      return 0
    })

    return list
  })

  function setView(view: ViewOption): void {
    if (view === 'all') statusFilter.value = 'all'
    else if (view === 'active') statusFilter.value = 'todo'
    else if (view === 'completed') statusFilter.value = 'done'
  }

  function resetFilters(): void {
    searchQuery.value = ''
    statusFilter.value = 'all'
    priorityFilter.value = 'all'
    sortBy.value = 'newest'
  }

  const hasActiveFilters = computed<boolean>(
    () =>
      searchQuery.value.trim().length > 0 ||
      statusFilter.value !== 'all' ||
      priorityFilter.value !== 'all',
  )

  return {
    searchQuery,
    statusFilter,
    priorityFilter,
    sortBy,
    filteredTasks,
    setView,
    resetFilters,
    hasActiveFilters,
  }
}
