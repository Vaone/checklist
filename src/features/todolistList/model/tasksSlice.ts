import { todolistAction, todolistThunks } from 'features/todolistList/model/todolistsSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appAction, RequestStatusType } from 'app/model/appSlice'
import { tasklistAPI } from 'features/todolistList/api/tasksApi'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { ResponseResultCode, TaskPriorities, TaskStatuses } from 'common/enums/enums'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { thunkTryCatch } from 'common/utils/thunkTryCatch'
import { T_Task } from '../api/tasksApi.types'

const slice = createSlice({
  name: 'tasklists',
  initialState: {} as TaskListType,
  reducers: {
    setLoadingStatus: (
      state,
      action: PayloadAction<{ todoListId: string; taskId: string; loadingStatus: RequestStatusType }>,
    ) => {
      const todoListId = action.payload.todoListId
      const taskId = action.payload.taskId
      const index = state[todoListId].findIndex((task) => task.id === taskId)
      if (index !== -1) {
        state[todoListId][index].loadingStatus = action.payload.loadingStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistThunks.fetchTodolist.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(todolistAction.clearState, () => {
        return {}
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todoListId] = action.payload.tasks.map((t) => ({ ...t, loadingStatus: 'idle' }))
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift({ ...action.payload.task, loadingStatus: 'idle' })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const todoListId = action.payload.task.todoListId
        const taskId = action.payload.task.id
        const index = state[todoListId].findIndex((task) => task.id === taskId)
        if (index !== -1) {
          state[todoListId][index] = { ...action.payload.task, loadingStatus: 'idle' }
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
      })
  },
})

// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: T_Task[]; todoListId: string }, string>(
  `${slice.name}/getTask`,
  async (todoListId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appAction.setRequestStatus({ status: 'loading' }))
    const res = await tasklistAPI.getTasklist(todoListId)
    const tasks = res.data.items
    dispatch(appAction.setRequestStatus({ status: 'success' }))
    return { tasks, todoListId }
  },
)
const addTask = createAppAsyncThunk<{ task: T_Task }, { todoListId: string; title: string }>(
  `${slice.name}/addTask`,
  async (args, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasklistAPI.createTask(args.todoListId, args.title)
      if (res.data.resultCode === ResponseResultCode.success) {
        dispatch(appAction.setRequestStatus({ status: 'success' }))
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch, false)
        return rejectWithValue(res.data)
      }
    })
  },
)
const updateTask = createAppAsyncThunk<{ task: T_Task }, { todoListId: string; taskId: string; model: TaskUpdModel }>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI
    dispatch(appAction.setRequestStatus({ status: 'loading' }))
    try {
      const task = getState().tasklists[arg.todoListId].find((t) => t.id === arg.taskId)
      if (!task) {
        console.warn('task not found in state')
        return rejectWithValue(null)
      }
      const ApiModel = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...arg.model,
      }
      const res = await tasklistAPI.updateTask(arg.todoListId, arg.taskId, ApiModel)
      if (res.data.resultCode === ResponseResultCode.success) {
        const task = res.data.data.item
        dispatch(appAction.setRequestStatus({ status: 'success' }))
        return { task }
      } else {
        handleServerAppError<{ item: T_Task }>(res.data, dispatch)
        return rejectWithValue(res.data)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
const removeTask = createAppAsyncThunk<{ todoListId: string; taskId: string }, { todoListId: string; taskId: string }>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appAction.setRequestStatus({ status: 'loading' }))
      dispatch(
        tasklistAction.setLoadingStatus({ todoListId: arg.todoListId, taskId: arg.taskId, loadingStatus: 'loading' }),
      )
      await tasklistAPI.deleteTask(arg.todoListId, arg.taskId)
      dispatch(appAction.setRequestStatus({ status: 'success' }))
      dispatch(
        tasklistAction.setLoadingStatus({ todoListId: arg.todoListId, taskId: arg.taskId, loadingStatus: 'success' }),
      )
      return { todoListId: arg.todoListId, taskId: arg.taskId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(
        tasklistAction.setLoadingStatus({ todoListId: arg.todoListId, taskId: arg.taskId, loadingStatus: 'failed' }),
      )
      return rejectWithValue(null)
    }
  },
)
// types
type TaskUpdModel = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TaskWithStatus = T_Task & {
  loadingStatus: RequestStatusType
}
export type TaskListType = {
  [todoListId: string]: TaskWithStatus[]
}
export const tasklistReducer = slice.reducer
export const tasklistAction = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask }
