import { tasklistReducer } from 'features/todolistList/model/tasksSlice'
import { todolistReducer } from 'features/todolistList/model/todolistsSlice'
import { appReducer } from './model/appSlice'
import { authReducer } from 'features/login/model/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    tasklists: tasklistReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
