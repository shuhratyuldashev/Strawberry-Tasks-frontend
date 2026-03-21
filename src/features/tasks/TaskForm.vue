<template>
  <transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @mousedown.self="$emit('close')"
    >
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')"></div>

      <div class="modal-box relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-zinc-200 z-10">
        <div class="flex items-center justify-between px-4 py-2">
          <div>
            <h2 class="text-lg font-800 text-zinc-900">{{ isEditing ? 'Edit Task' : 'Create Task' }}</h2>
            <p class="text-xs text-zinc-500 font-500 mt-0.5">
              {{ isEditing ? 'Update the task details below.' : 'Add a new task to your board.' }}
            </p>
          </div>
          <button
            class="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all"
            @click="$emit('close')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="px-6 pb-6 space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-xs font-800 text-zinc-700 mb-1.5 uppercase tracking-wide">Task Title *</label>
            <input
              ref="titleRef"
              v-model="form.title"
              type="text"
              placeholder="e.g. Design onboarding flow"
              class="input-base"
              :class="{ 'border-red-300 ring-2 ring-red-50': errors.title }"
              @input="errors.title = ''"
            />
            <p v-if="errors.title" class="text-xs text-red-500 font-600 mt-1">{{ errors.title }}</p>
          </div>


          <!-- Status & Priority -->
          <div class="grid grid-cols-2 gap-3">
            <!-- Status -->
            <div>
              <label class="block text-xs font-800 text-zinc-700 mb-1.5 uppercase tracking-wide">Status</label>
              <div class="relative" ref="statusDropRef">
                <button
                  type="button"
                  class="input-base text-left flex items-center justify-between"
                  @click="statusOpen = !statusOpen"
                >
                  <span class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" :class="statusDot[form.status]"></span>
                    <span>{{ statusLabel[form.status] }}</span>
                  </span>
                  <svg
                    class="w-3.5 h-3.5 text-zinc-400 transition-transform duration-150"
                    :class="statusOpen ? 'rotate-180' : ''"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <transition name="slide-down">
                  <div v-if="statusOpen" class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-card z-20 overflow-hidden">
                    <button
                      v-for="s in statusOptions" :key="s.value"
                      type="button"
                      class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-600 text-zinc-700 hover:bg-zinc-50 transition-colors"
                      :class="{ 'bg-zinc-50': form.status === s.value }"
                      @click="form.status = s.value; statusOpen = false"
                    >
                      <span class="w-2 h-2 rounded-full" :class="s.dot"></span>
                      {{ s.label }}
                    </button>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Priority -->
            <div>
              <label class="block text-xs font-800 text-zinc-700 mb-1.5 uppercase tracking-wide">Priority</label>
              <div class="relative" ref="priorityDropRef">
                <button
                  type="button"
                  class="input-base text-left flex items-center justify-between"
                  @click="priorityOpen = !priorityOpen"
                >
                  <span class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" :class="priorityDot[form.priority]"></span>
                    <span>{{ priorityLabel[form.priority] }}</span>
                  </span>
                  <svg
                    class="w-3.5 h-3.5 text-zinc-400 transition-transform duration-150"
                    :class="priorityOpen ? 'rotate-180' : ''"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <transition name="slide-down">
                  <div v-if="priorityOpen" class="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-card z-20 overflow-hidden">
                    <button
                      v-for="p in priorityOptions" :key="p.value"
                      type="button"
                      class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-600 text-zinc-700 hover:bg-zinc-50 transition-colors"
                      :class="{ 'bg-zinc-50': form.priority === p.value }"
                      @click="form.priority = p.value; priorityOpen = false"
                    >
                      <span class="w-2 h-2 rounded-full" :class="p.dot"></span>
                      {{ p.label }}
                    </button>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 pt-2">
            <button type="button" class="btn-outline flex-1 justify-center" @click="$emit('close')">Cancel</button>
            <button type="button" class="btn-primary flex-1 justify-center" @click="handleSubmit">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
              {{ isEditing ? 'Save Changes' : 'Create Task' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { Task, TaskCreateInput, TaskStatus, TaskPriority, StatusOption, PriorityOption } from '@/types/task'

interface FormState {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}

interface FormErrors {
  title: string
}

interface Props {
  show: boolean
  task?: Task | null
}

const props = withDefaults(defineProps<Props>(), { task: null })

const emit = defineEmits<{
  close: []
  save: [data: TaskCreateInput]
}>()

const titleRef = ref<HTMLInputElement | null>(null)
const statusDropRef = ref<HTMLElement | null>(null)
const priorityDropRef = ref<HTMLElement | null>(null)
const statusOpen = ref<boolean>(false)
const priorityOpen = ref<boolean>(false)

onClickOutside(statusDropRef, () => { statusOpen.value = false })
onClickOutside(priorityDropRef, () => { priorityOpen.value = false })

const isEditing = computed<boolean>(() => !!props.task)

const form = reactive<FormState>({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
})

const errors = reactive<FormErrors>({ title: '' })

watch(
  () => props.show,
  (val) => {
    if (val) {
      if (props.task) {
        form.title = props.task.title
        form.status = props.task.status
        form.priority = props.task.priority
      } else {
        form.title = ''
        form.description = ''
        form.status = 'todo'
        form.priority = 'medium'
      }
      errors.title = ''
      statusOpen.value = false
      priorityOpen.value = false
      nextTick(() => titleRef.value?.focus())
    }
  },
)

const statusOptions: StatusOption[] = [
  { value: 'todo', label: 'To Do', dot: 'bg-zinc-400' },
  { value: 'in-progress', label: 'In Progress', dot: 'bg-violet-400' },
  { value: 'done', label: 'Done', dot: 'bg-emerald-400' },
]
const statusLabel: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}
const statusDot: Record<TaskStatus, string> = {
  todo: 'bg-zinc-400',
  'in-progress': 'bg-violet-400',
  done: 'bg-emerald-400',
}

const priorityOptions: PriorityOption[] = [
  { value: 'high', label: 'High', dot: 'bg-red-400' },
  { value: 'medium', label: 'Medium', dot: 'bg-amber-400' },
  { value: 'low', label: 'Low', dot: 'bg-blue-400' },
]
const priorityLabel: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}
const priorityDot: Record<TaskPriority, string> = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-blue-400',
}

function handleSubmit(): void {
  if (!form.title.trim()) {
    errors.title = 'Task title is required.'
    titleRef.value?.focus()
    return
  }
  const payload: TaskCreateInput = {
    title: form.title.trim(),
    status: form.status,
    priority: form.priority,
  }
  emit('save', payload)
}
</script>
