import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { todolistAction } from 'features/todolistList/model/todolistsSlice'
import { appAction } from 'app/model/appSlice'
import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit'
import { authAPI, D_User } from 'features/login/api/auth-api'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { ResponseResultCode } from 'common/enums/enums'
import { AxiosResponse } from 'axios'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
    token: null as string | null,
  },
  selectors: {
    isLogged: (state) => state.isLogged,
    token: (state) => state.token,
  },
  reducers: {
    setLogin: (state, action: PayloadAction<{ isLogged: boolean }>) => {
      state.isLogged = action.payload.isLogged
    },
    setToken: (state, action: PayloadAction<{ token: string | null }>) => {
      state.token = action.payload.token
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      isFulfilled(login, logout, initializeApp),
      (state, action: PayloadAction<{ isLogged: boolean, token: string | null }>) => {
        state.isLogged = action.payload.isLogged
        state.token = action.payload.token
      },
    )
  },
})

//thunks
const login = createAppAsyncThunk<{ isLogged: true, token: string }, { data: D_User }>(
  `${slice.actions}/login`,
  async (args, { dispatch, rejectWithValue }) => {
    const res: AxiosResponse = await authAPI.login(args.data)
    if (res.data.resultCode === ResponseResultCode.success) {
      const token = res.data.data.token // Предполагаем, что токен находится здесь
      localStorage.setItem('token', token)
      return { isLogged: true, token }
    } else {
      handleServerAppError(res.data, dispatch, false)
      return rejectWithValue(res.data)
    }
  },
)

const logout = createAppAsyncThunk<{ isLogged: false, token: null }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  const res = await authAPI.logout()
  if (res.data.resultCode === ResponseResultCode.success) {
    localStorage.removeItem('token')
    dispatch(todolistAction.clearState())
    return { isLogged: false, token: null }
  } else {
    handleServerAppError(res.data, dispatch)
    return rejectWithValue(res.data)
  }
})

const initializeApp = createAppAsyncThunk<{ isLogged: boolean, token: string | null }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.getMe()
    dispatch(appAction.setAppInitialized({ isInitialized: true }))
    if (res.data.resultCode === ResponseResultCode.success) {
      const token = localStorage.getItem('token')
      return { isLogged: true, token }
    } else {
      const isShowAppError = !res.data.fieldsErrors.length
      handleServerAppError(res.data, dispatch, isShowAppError)
      return rejectWithValue(res.data)
    }
  },
)

export const authReducer = slice.reducer
export const authSelector = slice.selectors
export const authThunks = { login, logout, initializeApp }
