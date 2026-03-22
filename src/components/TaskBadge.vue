<template>
  <span
    v-if="type === 'priority'"
    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-700"
    :class="PRIORITY_CLASSES[value as TaskPriority]"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="PRIORITY_DOTS[value as TaskPriority]"></span>
    {{ PRIORITY_LABEL[value as TaskPriority] }}
  </span>

  <span
    v-else-if="type === 'status'"
    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-700"
    :class="STATUS_CLASSES[value as TaskStatus]"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="STATUS_DOTS[value as TaskStatus]"></span>
    {{ STATUS_LABEL[value as TaskStatus] }}
  </span>
</template>

<script setup lang="ts">
import type { TaskStatus, TaskPriority } from '@/types/task'
import { useAppConstants } from '@/composables/useAppConstants'

const { PRIORITY_LABEL, STATUS_LABEL, STATUS_CLASSES, STATUS_DOTS, PRIORITY_CLASSES, PRIORITY_DOTS } = useAppConstants()

interface Props {
  type?: 'priority' | 'status'
  value: string
}

withDefaults(defineProps<Props>(), { type: 'priority' })

</script>
