import { TaskPriorities, TaskStatuses } from 'common/enums/enums'

// types
export type T_Task = {
  id: string
  title: string
  addedDate: string
  order: number
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
  todoListId: string
}
export type T_UpdateModel = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export type getTasksResponse = {
  items: T_Task[]
  totalCount: number
  error: string
}
