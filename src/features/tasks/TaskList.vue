<template>
  <div>
    <!-- Filter bar -->
    <div class="flex items-center gap-2 mb-5 flex-wrap">
      <div class="flex items-center bg-pink-100 rounded-xl p-1 gap-0.5">
        <button
          v-for="tab in statusTabs"
          :key="tab.value"
          class="px-3 py-1.5 rounded-lg text-xs font-700 transition-all duration-150"
          :class="statusFilter === tab.value
            ? 'bg-pink-700 text-white shadow-soft'
            : 'text-pink-500 hover:text-pink-700'"
          @click="$emit('update:statusFilter', tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="relative" ref="priorityDropRef">
        <button
          class="btn-outline h-9 text-xs"
          :class="priorityFilter !== 'all' ? 'border-pink-400 text-zinc-900 bg-pink-50' : ''"
          @click="priorityOpen = !priorityOpen"
        >
          <span class="w-2 h-2 rounded-full" :class="priorityDotMap[priorityFilter]"></span>
          {{ priorityFilter === 'all' ? 'All Priority' : priorityLabelMap[priorityFilter as TaskPriority] }}
          <svg
            class="w-3 h-3 text-zinc-400 transition-transform duration-150"
            :class="priorityOpen ? 'rotate-180' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <transition name="slide-down">
          <div v-if="priorityOpen" class="absolute left-0 mt-1.5 w-40 bg-white border border-zinc-200 rounded-xl shadow-card overflow-hidden z-40">
            <button
              v-for="opt in priorityOptions"
              :key="opt.value"
              class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-600 text-zinc-700 hover:bg-zinc-50 transition-colors"
              :class="{ 'bg-zinc-50 text-zinc-900': priorityFilter === opt.value }"
              @click="selectPriority(opt.value)"
            >
              <span class="w-2 h-2 rounded-full" :class="opt.dot"></span>
              {{ opt.label }}
              <svg v-if="priorityFilter === opt.value" class="w-3.5 h-3.5 ml-auto text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </transition>
      </div>

      <button
        v-if="hasActiveFilters"
        class="btn-ghost h-9 text-xs text-zinc-500"
        @click="$emit('clearFilters')"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        Clear
      </button>

      <span class="ml-auto text-xs font-600 text-zinc-400">
        {{ tasks.length }} task{{ tasks.length !== 1 ? 's' : '' }}
      </span>
    </div>

    <!-- Task list -->
    <TransitionGroup name="task" tag="div" class="space-y-2.5">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="$emit('editTask', $event)"
        @delete="$emit('deleteTask', $event)"
        @changeStatus="(id, status) => $emit('changeStatus', id, status)"
        @changePriority="(id, priority) => $emit('changePriority', id, priority)"
        @toggleComplete="$emit('toggleComplete', $event)"
      />
    </TransitionGroup>

    <!-- Empty state -->
    <EmptyState
      v-if="tasks.length === 0"
      :title="emptyTitle"
      :message="emptyMessage"
      :showAction="!hasActiveFilters"
      @action="$emit('createTask')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import TaskItem from './TaskItem.vue'
import EmptyState from '@/components/EmptyState.vue'
import type { Task, TaskStatus, TaskPriority } from '@/types/task'

interface StatusTab {
  value: TaskStatus | 'all'
  label: string
}

interface PriorityFilterOption {
  value: TaskPriority | 'all'
  label: string
  dot: string
}

interface Props {
  tasks: Task[]
  statusFilter: TaskStatus | 'all'
  priorityFilter: TaskPriority | 'all'
  hasActiveFilters: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tasks: () => [],
  statusFilter: 'all',
  priorityFilter: 'all',
  hasActiveFilters: false,
})

const emit = defineEmits<{
  'update:statusFilter': [value: TaskStatus | 'all']
  'update:priorityFilter': [value: TaskPriority | 'all']
  editTask: [task: Task]
  deleteTask: [id: string]
  changeStatus: [id: string, status: TaskStatus]
  changePriority: [id: string, priority: TaskPriority]
  toggleComplete: [id: string]
  createTask: []
  clearFilters: []
}>()

const priorityOpen = ref<boolean>(false)
const priorityDropRef = ref<HTMLElement | null>(null)
onClickOutside(priorityDropRef, () => { priorityOpen.value = false })

const statusTabs: StatusTab[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

const priorityOptions: PriorityFilterOption[] = [
  { value: 'all', label: 'All Priority', dot: 'bg-zinc-300' },
  { value: 'high', label: 'High', dot: 'bg-red-400' },
  { value: 'medium', label: 'Medium', dot: 'bg-amber-400' },
  { value: 'low', label: 'Low', dot: 'bg-blue-400' },
]

const priorityDotMap: Record<string, string> = {
  all: 'bg-zinc-300',
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-blue-400',
}

const priorityLabelMap: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

function selectPriority(value: TaskPriority | 'all'): void {
  emit('update:priorityFilter', value)
  priorityOpen.value = false
}

const emptyTitle = computed<string>(() =>
  props.hasActiveFilters ? 'No matching tasks' : 'No tasks yet',
)

const emptyMessage = computed<string>(() =>
  props.hasActiveFilters
    ? 'Try adjusting your filters or search query.'
    : 'Create your first task to start managing your work.',
)
</script>
