import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/store'
import { BaseResponseType } from 'common/components/Types/common.types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: null | BaseResponseType
}>()
