import { appAction } from 'app/model/appSlice'
import { AppDispatch } from 'app/store'
import { isAxiosError } from 'axios'

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch) => {
  let errorMessage = 'Some error occured'
  if (isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appAction.setError({ error: errorMessage }))
  dispatch(appAction.setRequestStatus({ status: 'failed' }))
}

export type T_ResponseError = {
  statusCode: number
  messages: [{ message: string; field: string }]
  error: string
}
