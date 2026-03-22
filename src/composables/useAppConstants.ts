import { useTaskStore } from "@/store/taskStore"
import type { NavItem, PriorityNavItem, SortOption, SortOptionItem, StatCard, TaskPriority, TaskStatus, ViewOption } from "@/types/task"
import { computed } from "vue"

export function useAppConstants() {

const taskStore = useTaskStore()

const PAGE_TITLES: Record<ViewOption, string> = {
  all: 'All Tasks',
  active: 'Active Tasks',
  completed: 'Completed Tasks',
  settings: 'Settings',
}

const PAGE_SUBTITLES: Partial<Record<ViewOption, string>> = {
  all: 'Everything in one place.',
  active: 'Tasks that still need attention.',
  completed: "Tasks you've finished.",
}

const PRIORITY_CLASSES: Record<TaskPriority, string> = {
  high: 'bg-red-50 text-red-700 border border-red-100',
  medium: 'bg-amber-50 text-amber-700 border border-amber-100',
  low: 'bg-blue-50 text-blue-700 border border-blue-100',
}
const PRIORITY_DOTS: Record<TaskPriority, string> = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-blue-400',
}
const PRIORITY_LABEL: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

const STATUS_CLASSES: Record<TaskStatus, string> = {
  todo: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
  'in-progress': 'bg-violet-50 text-violet-700 border border-violet-100',
  done: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
}
const STATUS_DOTS: Record<TaskStatus, string> = {
  todo: 'bg-zinc-400',
  'in-progress': 'bg-violet-400',
  done: 'bg-emerald-400',
}
const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
}

const STATS = computed<StatCard[]>(() => [
  {
    label: 'Total Tasks',
    value: taskStore.totalCount,
    trend: 'All',
    iconBg: 'bg-zinc-100',
    iconColor: 'text-zinc-600',
    badgeCls: 'bg-zinc-100 text-zinc-500',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 7C3.25 6.58579 3.58579 6.25 4 6.25H20C20.4142 6.25 20.75 6.58579 20.75 7C20.75 7.41421 20.4142 7.75 20 7.75H4C3.58579 7.75 3.25 7.41421 3.25 7Z" fill="#1C274C"></path> <path opacity="0.7" d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z" fill="#1C274C"></path> <path opacity="0.4" d="M3.25 17C3.25 16.5858 3.58579 16.25 4 16.25H9C9.41421 16.25 9.75 16.5858 9.75 17C9.75 17.4142 9.41421 17.75 9 17.75H4C3.58579 17.75 3.25 17.4142 3.25 17Z" fill="#1C274C"></path> </g></svg>'
  },
  {
    label: 'In Progress',
    value: taskStore.inProgressCount,
    trend: 'Active',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    badgeCls: 'bg-violet-50 text-violet-600',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    label: 'To Do',
    value: taskStore.todoCount,
    trend: 'Pending',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    badgeCls: 'bg-amber-50 text-amber-600',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
  },
  {
    label: 'Completed',
    value: taskStore.completedCount,
    trend: 'Done',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    badgeCls: 'bg-emerald-50 text-emerald-600',
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
])

const SORT_OPTIONS: SortOptionItem[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'priority', label: 'By Priority' },
]

const SORT_LABELS: Record<SortOption, string> = {
  newest: 'Newest',
  oldest: 'Oldest',
  priority: 'Priority',
}

 const NAV_ITEMS = computed<NavItem[]>(() => [
  {
    id: 'all',
    label: 'All Tasks',
    count: taskStore.totalCount,
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>`,
  },
  {
    id: 'active',
    label: 'Active',
    count: taskStore.activeCount,
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    id: 'completed',
    label: 'Completed',
    count: taskStore.completedCount,
    icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
])

 const PRIORITY_ITEMS = computed<PriorityNavItem[]>(() => [
    { id: 'high', label: 'High Priority', dot: 'bg-red-400', count: taskStore.countByPriority('high') },
    { id: 'medium', label: 'Medium Priority', dot: 'bg-amber-400', count: taskStore.countByPriority('medium') },
    { id: 'low', label: 'Low Priority', dot: 'bg-blue-400', count: taskStore.countByPriority('low') },
    ])
    return {
        PAGE_TITLES,
        PAGE_SUBTITLES,
        PRIORITY_CLASSES,
        PRIORITY_DOTS,
        PRIORITY_LABEL,
        STATUS_CLASSES,
        STATUS_DOTS,
        STATUS_LABEL,
        STATS,
        NAV_ITEMS,
        PRIORITY_ITEMS,
        SORT_OPTIONS,
        SORT_LABELS,
    }
}