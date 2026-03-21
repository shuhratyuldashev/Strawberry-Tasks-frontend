<template>
  <div class="max-w-xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-800 text-zinc-900 tracking-tight">Settings</h1>
      <p class="text-sm text-zinc-500 font-500 mt-1">Manage your preferences and account.</p>
    </div>

    <!-- Profile Card -->
    <div class="card-base p-6 mb-4">
      <h2 class="text-sm font-800 text-zinc-800 mb-4 uppercase tracking-wider">Profile</h2>
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-pink-700 text-white text-lg font-800 flex items-center justify-center flex-shrink-0">
          JD
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-700 text-zinc-900">Jane Doe</p>
          <p class="text-xs text-zinc-500 font-500 mt-0.5">jane.doe@example.com</p>
        </div>
        <button class="btn-danger text-xs">Log out</button>
      </div>
    </div>

    <!-- Preferences Card -->
    <div class="card-base p-6 mb-4">
      <h2 class="text-sm font-800 text-zinc-800 mb-4 uppercase tracking-wider">Preferences</h2>
      <div class="space-y-4">
        <div
          v-for="pref in preferences"
          :key="pref.id"
          class="flex items-center justify-between gap-4"
        >
          <div>
            <p class="text-sm font-700 text-zinc-800">{{ pref.label }}</p>
            <p class="text-xs text-zinc-500 font-500 mt-0.5">{{ pref.description }}</p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-sm"
            :checked="pref.enabled"
            @change="pref.enabled = !pref.enabled"
          />
        </div>
      </div>
    </div>

    <!-- Stats summary -->
    <div class="card-base p-6 mb-4">
      <h2 class="text-sm font-800 text-zinc-800 mb-4 uppercase tracking-wider">Task Summary</h2>
      <div class="space-y-2.5">
        <div v-for="row in summaryRows" :key="row.label" class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :class="row.dot"></span>
            <span class="text-sm font-600 text-zinc-600">{{ row.label }}</span>
          </div>
          <span class="text-sm font-800 text-zinc-900">{{ row.value }}</span>
        </div>
        <!-- Progress bar -->
        <div class="mt-3 pt-3 border-t border-zinc-100">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-xs font-600 text-zinc-500">Overall completion</span>
            <span class="text-xs font-800 text-zinc-700">{{ completionPct }}%</span>
          </div>
          <div class="h-2 bg-pink-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-pink-500 rounded-full transition-all duration-500"
              :style="{ width: completionPct + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="card-base p-6 border-red-100">
      <h2 class="text-sm font-800 text-red-600 mb-4 uppercase tracking-wider">Danger Zone</h2>
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-700 text-zinc-800">Clear all tasks</p>
          <p class="text-xs text-zinc-500 font-500 mt-0.5">Permanently delete all tasks. This cannot be undone.</p>
        </div>
        <button
          class="flex-shrink-0 px-3.5 py-2 text-sm font-700 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-all"
          @click="handleClearAll"
        >
          Clear All
        </button>
      </div>
    </div>

    <div class="text-center mt-8">
      <p class="text-xs text-zinc-400 font-500">TaskFlow v1.0.0 — Vue 3 + TypeScript + Pinia + DaisyUI</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useTaskStore } from '@/store/taskStore'

interface Preference {
  id: string
  label: string
  description: string
  enabled: boolean
}

interface SummaryRow {
  label: string
  value: number
  dot: string
}

const store = useTaskStore()

const preferences = reactive<Preference[]>([
  { id: 'notifications', label: 'Task Notifications', description: 'Get notified when tasks are due.', enabled: true },
  { id: 'animations', label: 'Smooth Animations', description: 'Enable transition animations in the UI.', enabled: true },
  { id: 'autosave', label: 'Auto-save Drafts', description: 'Automatically save form drafts.', enabled: false },
  { id: 'confirm', label: 'Confirm Before Delete', description: 'Ask for confirmation before deleting tasks.', enabled: true },
])

const summaryRows = computed<SummaryRow[]>(() => [
  { label: 'Total Tasks', value: store.totalCount, dot: 'bg-zinc-400' },
  { label: 'In Progress', value: store.inProgressCount, dot: 'bg-violet-400' },
  { label: 'To Do', value: store.todoCount, dot: 'bg-amber-400' },
  { label: 'Completed', value: store.completedCount, dot: 'bg-emerald-400' },
])

const completionPct = computed<number>(() => {
  if (store.totalCount === 0) return 0
  return Math.round((store.completedCount / store.totalCount) * 100)
})

function handleClearAll(): void {
  if (window.confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
    store.clearAll()
  }
}
</script>
