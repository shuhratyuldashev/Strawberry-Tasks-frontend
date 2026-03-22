<template>
  <div class="min-h-screen bg-white font-nunito">
    <AppSidebar
      :isOpen="sidebarOpen"
      :currentView="currentView"
      :selectedPriority="priorityFilter"
      @update:currentView="handleViewChange"
      @update:selectedPriority="priorityFilter = ($event as TaskPriority | 'all')"
      @close="sidebarOpen = false"
    />

    <div class="lg:ml-64 flex flex-col min-h-screen">
      <AppTopbar
        v-model:searchQuery="searchQuery"
        v-model:sortBy="sortBy"
        @createTask="openCreateForm"
        @toggleSidebar="sidebarOpen = !sidebarOpen"
      />

      <main class="flex-1 pt-16">
        <div class="px-4 md:px-6 py-6 max-w-4xl mx-auto w-full">

          <div class="flex items-start justify-between mb-6">
            <div>
              <h1 class="text-2xl font-800 text-zinc-900 tracking-tight">{{ pageTitle }}</h1>
              <p class="text-sm text-zinc-500 font-500 mt-1">{{ pageSubtitle }}</p>
            </div>
            <button
              v-if="currentView !== 'settings'"
              class="btn-primary hidden sm:inline-flex"
              @click="openCreateForm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
              </svg>
              New Task
            </button>
          </div>

          <SettingsView v-if="currentView === 'settings'" />

          <template v-else>
            <StatsBar />
            <TaskList
              :tasks="filteredTasks"
              v-model:statusFilter="statusFilter"
              v-model:priorityFilter="priorityFilter"
              :hasActiveFilters="hasActiveFilters"
              @editTask="openEditForm"
              @deleteTask="(id: number) => { confirmDeleteId = id }"
              @changeStatus="changeStatus"
              @changePriority="changePriority"
              @toggleTask="toggleTask"
              @createTask="openCreateForm"
              @clearFilters="resetFilters"
            />
          </template>
        </div>
      </main>
    </div>

    <TaskForm
      :show="showForm"
      :task="editingTask"
      @close="closeForm"
      @save="saveTask"
    />

    <DeleteConfirmModal
      :show="!!confirmDeleteId"
      @confirm="confirmDeleteId && deleteTask(confirmDeleteId)"
      @cancel="confirmDeleteId = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import StatsBar from '@/components/StatsBar.vue'
import TaskList from '@/features/tasks/TaskList.vue'
import TaskForm from '@/features/tasks/TaskForm.vue'
import SettingsView from '@/features/tasks/SettingsView.vue'
import DeleteConfirmModal from '@/components/DeleteConfirmModal.vue'
import { useFilters } from '@/composables/useFilters'
import { useTaskActions } from '@/composables/useTaskActions'
import type { ViewOption, TaskPriority } from '@/types/task'
import { useAppConstants } from '@/composables/useAppConstants'

const { PAGE_SUBTITLES, PAGE_TITLES } = useAppConstants()

const sidebarOpen = ref<boolean>(false)
const currentView = ref<ViewOption>('all')

const {
  searchQuery,
  statusFilter,
  priorityFilter,
  sortBy,
  filteredTasks,
  setView,
  resetFilters,
  hasActiveFilters,
} = useFilters()

const {
  editingTask,
  showForm,
  confirmDeleteId,
  openCreateForm,
  openEditForm,
  closeForm,
  saveTask,
  deleteTask,
  changeStatus,
  changePriority,
  toggleTask,
} = useTaskActions()

onMounted(() => {
  
})

function handleViewChange(view: string): void {
  currentView.value = view as ViewOption
  if (view !== 'settings') {
    setView(view as ViewOption)
  }
}


const pageTitle = computed<string>(() => PAGE_TITLES[currentView.value] ?? 'Tasks')
const pageSubtitle = computed<string>(() => PAGE_SUBTITLES[currentView.value] ?? '')
</script>
