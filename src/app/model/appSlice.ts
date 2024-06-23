import { createSlice, isFulfilled, isPending, isRejected, PayloadAction, UnknownAction } from '@reduxjs/toolkit'
import { todolistThunks } from 'features/todolistList/model/todolistsSlice'

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean,
  },
  selectors: {
    isInitialized: (state) => state.isInitialized,
    error: (state) => state.error,
    status: (state) => state.status,
  },
  reducers: {
    setRequestStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'success'
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = 'failed'

        if (action.payload) {
          if (action.type === todolistThunks.addTodolist.rejected.type) return
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : 'Some error occurred'
        }
      })
  },
})

export const appReducer = slice.reducer
export const appAction = slice.actions
export const appSelector = slice.selectors

// types
export type RequestStatusType = 'idle' | 'success' | 'loading' | 'failed' | 'file'
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>
