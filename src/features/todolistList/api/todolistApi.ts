import { BaseResponseType } from 'common/components/Types/common.types'
import { T_Todolist } from './todolistApi.types'
import { instance } from '../../../app/api/baseAPI'

export const todolistAPI = {
  getTodolists: () => instance.get<T_Todolist[]>('todo-lists'),
  createTodolist: (title: string) => instance.post<BaseResponseType<{ item: T_Todolist }>>('todo-lists', { title }),
  updateTodolist: (todolistId: string, title: string) =>
    instance.put<BaseResponseType>('todo-lists/' + todolistId, { title }),
  deleteTodolist: (todolistId: string) => instance.delete<BaseResponseType>('todo-lists/' + todolistId),
}
