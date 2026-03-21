<template>
  <header class="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-pink-50/90 backdrop-blur border-b border-pink-200 z-10 flex items-center gap-3 px-4 md:px-6">
    <button class="lg:hidden btn-ghost p-2 -ml-1" @click="$emit('toggleSidebar')">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <div class="relative flex-1 max-w-sm">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input
        type="text"
        placeholder="Search tasks..."
        class="input-base pl-9 pr-4 h-9 text-sm"
        :value="searchQuery"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="flex items-center gap-2 ml-auto">
      <div class="relative" ref="sortDropdownRef">
        <button class="btn-outline h-9 hidden sm:inline-flex" @click="sortOpen = !sortOpen">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
          </svg>
          <span class="text-xs">{{ sortLabels[sortBy] }}</span>
          <svg
            class="w-3 h-3 text-zinc-400 transition-transform duration-150"
            :class="sortOpen ? 'rotate-180' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <transition name="slide-down">
          <div v-if="sortOpen" class="absolute right-0 mt-1.5 w-40 bg-white border border-zinc-200 rounded-xl shadow-card overflow-hidden z-50">
            <button
              v-for="opt in sortOptions"
              :key="opt.value"
              class="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-600 text-zinc-700 hover:bg-zinc-50 transition-colors"
              :class="{ 'text-zinc-900 bg-zinc-50': sortBy === opt.value }"
              @click="selectSort(opt.value)"
            >
              {{ opt.label }}
              <svg v-if="sortBy === opt.value" class="w-3.5 h-3.5 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </transition>
      </div>

      <button class="btn-primary h-9" @click="$emit('createTask')">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
        </svg>
        <span class="hidden sm:block text-sm">New Task</span>
      </button>

      <div class="w-8 h-8 rounded-full bg-white text-pink-700 border-pink-700 border text-xs font-800 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0">
        JD
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { SortOption, SortOptionItem } from '@/types/task'

interface Props {
  searchQuery: string
  sortBy: SortOption
}

defineProps<Props>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:sortBy': [value: SortOption]
  createTask: []
  toggleSidebar: []
}>()

const sortOpen = ref<boolean>(false)
const sortDropdownRef = ref<HTMLElement | null>(null)

const sortOptions: SortOptionItem[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'priority', label: 'By Priority' },
]

const sortLabels: Record<SortOption, string> = {
  newest: 'Newest',
  oldest: 'Oldest',
  priority: 'Priority',
}

onClickOutside(sortDropdownRef, () => { sortOpen.value = false })

function selectSort(value: SortOption): void {
  emit('update:sortBy', value)
  sortOpen.value = false
}
</script>
