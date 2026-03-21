// ─── Task Domain Types ────────────────────────────────────────────────────────

export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'high' | 'medium' | 'low'
export type SortOption = 'newest' | 'oldest' | 'priority'
export type ViewOption = 'all' | 'active' | 'completed' | 'settings'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  createdAt: string // ISO date string
}

export type TaskCreateInput = Omit<Task, 'id' | 'createdAt'>
export type TaskUpdateInput = Partial<TaskCreateInput>

// ─── UI / Display Helpers ─────────────────────────────────────────────────────

export interface StatusOption {
  value: TaskStatus
  label: string
  dot: string
}

export interface PriorityOption {
  value: TaskPriority
  label: string
  dot: string
}

export interface SortOptionItem {
  value: SortOption
  label: string
}

export interface NavItem {
  id: ViewOption | string
  label: string
  count: number
  icon: string
}

export interface PriorityNavItem {
  id: TaskPriority
  label: string
  dot: string
  count: number
}

export interface StatCard {
  label: string
  value: number
  trend: string
  iconBg: string
  iconColor: string
  badgeCls: string
  icon: string
}
