<template>
  <div
    class="group bg-white border border-zinc-200 rounded-2xl px-4 py-3.5 hover:border-zinc-300 hover:shadow-card transition-all duration-200"
    :class="{ 'opacity-70': task.status === 'done' }"
  >
    <div class="flex items-center gap-3">
      <button
        class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150"
        :class="task.status === 'done' ? 'bg-pink-500 border-pink-500' : 'border-zinc-300 hover:border-zinc-500'"
        @click="$emit('toggleTask', Number(task.id))"
      >
        <svg v-if="task.status === 'done'" class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
      </button>

      <div class="flex-1 flex min-w-0">
        <div class="flex items-center w-full justify-between gap-2">
          <p
            class="text-sm font-700 text-zinc-900 leading-snug"
            :class="{ 'line-through text-zinc-400': task.status === 'done' }"
          >{{ task.title }}</p>

            <TaskBadge type="status" :value="task.status" />
            <TaskBadge type="priority" :value="task.priority" />
            <span class="ml-auto text-[11px] text-zinc-400 font-500 flex-shrink-0">{{ timeAgo(task.created_at) }}</span>
          

          <div class="relative flex-shrink-0" ref="menuRef">
            <button
              class="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all duration-150 opacity-0 group-hover:opacity-100"
              @click.stop="menuOpen = !menuOpen"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>

            <transition name="slide-down">
              <div v-if="menuOpen" class="absolute right-0 mt-1 w-52 bg-white border border-zinc-200 rounded-xl shadow-card z-50 overflow-hidden">
                <button class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-600 text-zinc-700 hover:bg-zinc-50 transition-colors" @click="handleEdit">
                  <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit Task
                </button>

                <div class="border-t border-zinc-100 pt-1 pb-1">
                  <p class="px-3.5 py-1 text-[10px] font-800 uppercase tracking-widest text-zinc-400">Change Status</p>
                  <button
                    v-for="s in statusOptions" :key="s.value"
                    class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-600 text-zinc-700 hover:bg-zinc-50 transition-colors"
                    :class="{ 'text-zinc-400 cursor-default': task.status === s.value }"
                    @click="handleStatusChange(s.value)"
                  >
                    <span class="w-2 h-2 rounded-full" :class="s.dot"></span>
                    {{ s.label }}
                    <svg v-if="task.status === s.value" class="w-3.5 h-3.5 ml-auto text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>

                <div class="border-t border-zinc-100 pt-1 pb-1">
                  <p class="px-3.5 py-1 text-[10px] font-800 uppercase tracking-widest text-zinc-400">Change Priority</p>
                  <button
                    v-for="p in priorityOptions" :key="p.value"
                    class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-600 text-zinc-700 hover:bg-zinc-50 transition-colors"
                    :class="{ 'text-zinc-400 cursor-default': task.priority === p.value }"
                    @click="handlePriorityChange(p.value)"
                  >
                    <span class="w-2 h-2 rounded-full" :class="p.dot"></span>
                    {{ p.label }}
                    <svg v-if="task.priority === p.value" class="w-3.5 h-3.5 ml-auto text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>

                <div class="border-t border-zinc-100 pt-1">
                  <button class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-600 text-red-600 hover:bg-red-50 transition-colors" @click="handleDelete">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete Task
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import TaskBadge from '@/components/TaskBadge.vue'
import type { Task, TaskStatus, TaskPriority, StatusOption, PriorityOption } from '@/types/task'

interface Props {
  task: Task
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [task: Task]
  delete: [id: number]
  changeStatus: [id: number, status: TaskStatus]
  changePriority: [id: number, priority: TaskPriority]
  toggleTask: [id: number]
}>()

const menuOpen = ref<boolean>(false)
const menuRef = ref<HTMLElement | null>(null)

onClickOutside(menuRef, () => { menuOpen.value = false })

const statusOptions: StatusOption[] = [
  { value: 'todo', label: 'To Do', dot: 'bg-zinc-400' },
  { value: 'in-progress', label: 'In Progress', dot: 'bg-violet-400' },
  { value: 'done', label: 'Done', dot: 'bg-emerald-400' },
]

const priorityOptions: PriorityOption[] = [
  { value: 'high', label: 'High', dot: 'bg-red-400' },
  { value: 'medium', label: 'Medium', dot: 'bg-amber-400' },
  { value: 'low', label: 'Low', dot: 'bg-blue-400' },
]

function handleEdit(): void {
  menuOpen.value = false
  emit('edit', props.task)
}

function handleDelete(): void {
  menuOpen.value = false
  emit('delete', props.task.id)
}

function handleStatusChange(status: TaskStatus): void {
  if (props.task.status === status) return
  menuOpen.value = false
  emit('changeStatus', props.task.id, status)
}

function handlePriorityChange(priority: TaskPriority): void {
  if (props.task.priority === priority) return
  menuOpen.value = false
  emit('changePriority', props.task.id, priority) 
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return mins <= 1 ? 'just now' : `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}
</script>
