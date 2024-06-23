import { BaseResponseType } from 'common/components/Types/common.types'
import { getTasksResponse, T_Task, T_UpdateModel } from './tasksApi.types'
import { instance } from '../../../app/api/baseAPI'

export const tasklistAPI = {
  getTasklist: (todolistId: string) => instance.get<getTasksResponse>(`todo-lists/${todolistId}/tasks`),
  createTask: (todolistId: string, title: string) =>
    instance.post<BaseResponseType<{ item: T_Task }>>(`todo-lists/${todolistId}/tasks`, { title }),
  updateTask: (todolistId: string, taskId: string, model: T_UpdateModel) =>
    instance.put<BaseResponseType<{ item: T_Task }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model),
  deleteTask: (todolistId: string, taskId: string) =>
    instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`),
}
