<template>
  <span
    v-if="type === 'priority'"
    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-700"
    :class="priorityClasses[value as TaskPriority]"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="priorityDot[value as TaskPriority]"></span>
    {{ priorityLabel[value as TaskPriority] }}
  </span>

  <span
    v-else-if="type === 'status'"
    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-700"
    :class="statusClasses[value as TaskStatus]"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="statusDot[value as TaskStatus]"></span>
    {{ statusLabel[value as TaskStatus] }}
  </span>
</template>

<script setup lang="ts">
import type { TaskStatus, TaskPriority } from '@/types/task'

interface Props {
  type?: 'priority' | 'status'
  value: string
}

withDefaults(defineProps<Props>(), { type: 'priority' })

const priorityClasses: Record<TaskPriority, string> = {
  high: 'bg-red-50 text-red-700 border border-red-100',
  medium: 'bg-amber-50 text-amber-700 border border-amber-100',
  low: 'bg-blue-50 text-blue-700 border border-blue-100',
}
const priorityDot: Record<TaskPriority, string> = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-blue-400',
}
const priorityLabel: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

const statusClasses: Record<TaskStatus, string> = {
  todo: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
  'in-progress': 'bg-violet-50 text-violet-700 border border-violet-100',
  done: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
}
const statusDot: Record<TaskStatus, string> = {
  todo: 'bg-zinc-400',
  'in-progress': 'bg-violet-400',
  done: 'bg-emerald-400',
}
const statusLabel: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}
</script>
