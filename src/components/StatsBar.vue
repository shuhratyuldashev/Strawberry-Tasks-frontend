<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-white border border-zinc-200 rounded-2xl p-4 hover:border-zinc-300 hover:shadow-card transition-all duration-200"
    >
      <div class="flex items-center justify-between mb-3">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center" :class="stat.iconBg">
          <span v-html="stat.icon" class="w-4 h-4" :class="stat.iconColor"></span>
        </div>
        <span class="text-[11px] font-700 px-2 py-0.5 rounded-lg" :class="stat.badgeCls">{{ stat.trend }}</span>
      </div>
      <p class="text-2xl font-800 text-zinc-900 leading-none">{{ stat.value }}</p>
      <p class="text-xs font-600 text-zinc-500 mt-1">{{ stat.label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import type { StatCard } from '@/types/task'

const store = useTaskStore()

const stats = computed<StatCard[]>(() => [
  {
    label: 'Total Tasks',
    value: store.totalCount,
    trend: 'All',
    iconBg: 'bg-zinc-100',
    iconColor: 'text-zinc-600',
    badgeCls: 'bg-zinc-100 text-zinc-500',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 7C3.25 6.58579 3.58579 6.25 4 6.25H20C20.4142 6.25 20.75 6.58579 20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H4C3.58579 7.75 3.25 7.41421 3.25 7Z" fill="#1C274C"></path> <path opacity="0.7" d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z" fill="#1C274C"></path> <path opacity="0.4" d="M3.25 17C3.25 16.5858 3.58579 16.25 4 16.25H9C9.41421 16.25 9.75 16.5858 9.75 17C9.75 17.4142 9.41421 17.75 9 17.75H4C3.58579 17.75 3.25 17.4142 3.25 17Z" fill="#1C274C"></path> </g></svg>'
  },
  {
    label: 'In Progress',
    value: store.inProgressCount,
    trend: 'Active',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    badgeCls: 'bg-violet-50 text-violet-600',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    label: 'To Do',
    value: store.todoCount,
    trend: 'Pending',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    badgeCls: 'bg-amber-50 text-amber-600',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
  },
  {
    label: 'Completed',
    value: store.completedCount,
    trend: 'Done',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    badgeCls: 'bg-emerald-50 text-emerald-600',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
])
</script>
