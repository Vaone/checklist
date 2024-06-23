import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'
import { RootState } from './store'
import { tasklistReducer } from 'features/todolistList/model/tasksSlice'
import { todolistReducer } from 'features/todolistList/model/todolistsSlice'
import { authReducer } from 'features/login/model/authSlice'

const rootReducer = combineReducers({
  tasklists: tasklistReducer,
  todolists: todolistReducer,
  auth: authReducer,
})

const initialGlobalState: RootState = {
  todolists: { todolists: [] },
  tasklists: {},
  app: { status: 'loading', error: null, isInitialized: false },
  auth: { isLogged: false, token: null },
}

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as RootState & undefined)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storybookStore}>{storyFn()}</Provider>
}
