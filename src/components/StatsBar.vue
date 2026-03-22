<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
    <div
      v-for="stat in STATS"
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
import { useAppConstants } from '@/composables/useAppConstants';

const { STATS } = useAppConstants();



</script>
