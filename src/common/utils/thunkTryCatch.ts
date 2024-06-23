import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { appAction } from 'app/model/appSlice'
import { AppDispatch, RootState } from 'app/store'
import { BaseResponseType } from 'common/components/Types/common.types'
import { handleServerNetworkError } from './handleServerNetworkError'

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<RootState, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    return await logic()
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
}
