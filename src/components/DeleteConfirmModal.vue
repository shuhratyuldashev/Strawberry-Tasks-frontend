<template>
  <transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('cancel')"></div>
      <div class="modal-box relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-zinc-200 z-10 p-6">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-800 text-zinc-900">Delete task?</h3>
            <p class="text-xs text-zinc-500 font-500 mt-1 leading-relaxed">This action cannot be undone. The task will be permanently removed.</p>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-5">
          <button class="btn-outline flex-1 justify-center text-sm" @click="$emit('cancel')">Cancel</button>
          <button
            class="flex-1 justify-center inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-700 rounded-xl hover:bg-red-700 active:scale-95 transition-all"
            @click="$emit('confirm')"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface Props { show: boolean }
defineProps<Props>()
defineEmits<{ confirm: []; cancel: [] }>()
</script>
