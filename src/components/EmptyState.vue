<template>
  <div class="flex flex-col items-center justify-center py-20 px-8 text-center">
    <div class="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-5">
      <svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
    </div>
    <h3 class="text-base font-800 text-zinc-800 mb-1.5">{{ title }}</h3>
    <p class="text-sm text-zinc-500 font-500 max-w-xs leading-relaxed mb-5">{{ message }}</p>
    <button v-if="showAction" class="btn-primary" @click="$emit('action')">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
      </svg>
      Create Task
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  showAction?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'No tasks yet',
  message: 'Create your first task to get started.',
  showAction: true,
})

defineEmits<{ action: [] }>()
</script>
