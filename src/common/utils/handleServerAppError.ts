import { Dispatch } from '@reduxjs/toolkit'
import { appAction } from 'app/model/appSlice'
import { BaseResponseType } from 'common/components/Types/common.types'

export const handleServerAppError = <T>(
  data: BaseResponseType<T>,
  dispatch: Dispatch<ErrorUtilsDispatchType>,
  isShowGlobalError: boolean = true,
) => {
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(appAction.setError({ error: data.messages[0] }))
    } else {
      dispatch(appAction.setError({ error: 'Some error occurred' }))
    }
  }
  dispatch(appAction.setRequestStatus({ status: 'failed' }))
}

type ErrorUtilsDispatchType = ReturnType<typeof appAction.setRequestStatus> | ReturnType<typeof appAction.setError>
