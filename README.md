# TaskFlow — Task Management App (TypeScript)

A modern, minimal task management dashboard built with Vue 3, TypeScript, Pinia, Tailwind CSS, and DaisyUI.

## Tech Stack

- **Vue 3** — Composition API + `<script setup lang="ts">`
- **TypeScript** — Strict mode, full type coverage
- **Pinia** — Typed state management
- **Tailwind CSS** — Utility-first styling
- **DaisyUI** — Component layer (toggle, theme, etc.)
- **@vueuse/core** — `onClickOutside` utility
- **Vite** + **vue-tsc** — Build & type checking

## Getting Started

```bash
npm install
npm run dev         # Start dev server
npm run build       # Type-check + production build
npm run type-check  # Type-check only (no emit)
npm run preview     # Preview production build
```

## Project Structure

```
src/
├── App.vue                          # Root component
├── main.ts                          # Entry point
├── vite-env.d.ts                    # Vite env types
├── style.css                        # Global styles + transitions
├── types/
│   └── task.ts                      # All shared TS types & interfaces
├── store/
│   └── taskStore.ts                 # Pinia store (typed)
├── composables/
│   ├── useFilters.ts                # Filter/search/sort logic
│   └── useTaskActions.ts            # CRUD action handlers
├── components/
│   ├── AppSidebar.vue               # Left navigation
│   ├── AppTopbar.vue                # Top header bar
│   ├── StatsBar.vue                 # Stats overview cards
│   ├── TaskBadge.vue                # Status/Priority chips
│   ├── EmptyState.vue               # Empty list state
│   └── DeleteConfirmModal.vue       # Delete confirmation
└── features/tasks/
    ├── TaskList.vue                 # List + filter tabs
    ├── TaskItem.vue                 # Single task row + dropdown
    ├── TaskForm.vue                 # Create/Edit modal
    └── SettingsView.vue             # Settings page
```

## Key Types (`src/types/task.ts`)

```ts
type TaskStatus   = 'todo' | 'in-progress' | 'done'
type TaskPriority = 'high' | 'medium' | 'low'
type SortOption   = 'newest' | 'oldest' | 'priority'
type ViewOption   = 'all' | 'active' | 'completed' | 'settings'

interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdAt: string  // ISO date string
}

type TaskCreateInput = Omit<Task, 'id' | 'createdAt'>
type TaskUpdateInput = Partial<TaskCreateInput>
```

## Features

- ✅ Full Task CRUD with typed store actions
- ✅ Strict TypeScript across all Vue SFCs, composables, and store
- ✅ Generic `defineProps<Props>()` / `defineEmits<{}>()` syntax
- ✅ Record<K, V> lookup maps instead of plain objects
- ✅ Filter by status, priority, and full-text search
- ✅ Sort by newest / oldest / priority
- ✅ Per-task action dropdown (edit, change status/priority, delete)
- ✅ Stats bar, empty state, delete confirmation modal
- ✅ Smooth TransitionGroup animations
- ✅ Responsive mobile layout with collapsible sidebar
- ✅ Nunito font, shadcn-style zinc palette
