<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
      @click="$emit('close')"
    />
  </transition>

  <aside
    :class="[
      'fixed top-0 left-0 h-full w-64 z-30 flex flex-col bg-pink-50 border-r border-pink-200 transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <div class="flex items-center gap-2.5 px-5 py-5 border-b border-pink-200">
      <div class="w-8 h-8 bg-pink-700 text-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
            S
      </div>
      <span class="text-base font-800 text-zinc-900 tracking-tight">
        <span class="text-pink-700">Strawberry</span>Tasks
      </span>
    </div>

    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <p class="px-3 mb-2 text-[10px] font-800 uppercase tracking-widest text-pink-400">Views</p>
      <button
        v-for="item in navItems"
        :key="item.id"
        class="sidebar-item w-full"
        :class="{ active: currentView === item.id }"
        @click="selectView(item.id)"
      >
        <span class="flex-shrink-0" v-html="item.icon"></span>
        <span>{{ item.label }}</span>
        <span
          class="ml-auto text-xs font-700 px-1.5 py-0.5 rounded-md"
          :class="currentView === item.id ? 'bg-pink-100/20 text-white' : 'bg-pink-200 text-pink-500'"
        >{{ item.count }}</span>
      </button>

      <div class="pt-4 ">
        <p class="px-3 mb-2 text-[10px] font-800 uppercase tracking-widest text-pink-400">Priority</p>
        <button
          v-for="p in priorityItems"
          :key="p.id"
          class="sidebar-item w-full"
          :class="{ active: selectedPriority === p.id }"
          @click="selectPriority(p.id)"
        >
          <span class="w-2 h-2 rounded-full flex-shrink-0" :class="p.dot"></span>
          <span>{{ p.label }}</span>
          <span
            class="ml-auto text-xs font-700 px-1.5 py-0.5 rounded-md"
            :class="selectedPriority === p.id ? 'bg-pink-100/20 text-white' : 'bg-pink-200 text-pink-500'"
          >{{ p.count }}</span>
        </button>
      </div>

     
    </nav>

    <div class="px-3 py-4 border-t border-pink-200 space-y-1">
      <button
        class="sidebar-item text-pink-500 w-full"
        :class="{ active: currentView === 'settings' }"
        @click="selectView('settings')"
      >
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span>Settings</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import type { NavItem, PriorityNavItem, TaskPriority } from '@/types/task'

interface Props {
  isOpen: boolean
  currentView: string
  selectedPriority: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:currentView': [value: string]
  'update:selectedPriority': [value: string]
  close: []
}>()

const store = useTaskStore()

const navItems = computed<NavItem[]>(() => [
  {
    id: 'all',
    label: 'All Tasks',
    count: store.totalCount,
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>`,
  },
  {
    id: 'active',
    label: 'Active',
    count: store.activeCount,
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    id: 'completed',
    label: 'Completed',
    count: store.completedCount,
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
])

const priorityItems = computed<PriorityNavItem[]>(() => [
  { id: 'high', label: 'High Priority', dot: 'bg-red-400', count: store.countByPriority('high') },
  { id: 'medium', label: 'Medium Priority', dot: 'bg-amber-400', count: store.countByPriority('medium') },
  { id: 'low', label: 'Low Priority', dot: 'bg-blue-400', count: store.countByPriority('low') },
])

function selectView(id: string): void {
  emit('update:currentView', id)
  emit('close')
}

function selectPriority(id: TaskPriority): void {
  const newVal = props.selectedPriority === id ? 'all' : id
  emit('update:selectedPriority', newVal)
  emit('close')
}
</script>
