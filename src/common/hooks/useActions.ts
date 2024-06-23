import { appAction } from 'app/model/appSlice'
import { authThunks } from 'features/login/model/authSlice'
import { tasksThunks } from 'features/todolistList/model/tasksSlice'
import { todolistAction, todolistThunks } from 'features/todolistList/model/todolistsSlice'
import { useMemo } from 'react'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useAppDispatch } from './useAppHooks'

// ❗ упаковываем actions и соответсвенно при вызове хука не нужно
// будет передавать actions
const actionsAll = { ...tasksThunks, ...todolistThunks, ...todolistAction, ...authThunks, ...appAction }

type AllActions = typeof actionsAll

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(
    () => bindActionCreators<AllActions, RemapActionCreators<AllActions>>(actionsAll, dispatch),
    [dispatch],
  )
}

// Types
type ReplaceReturnType<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<ReturnType<T>>
  : () => T

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K]>
}
