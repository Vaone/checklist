export type FieldErrorType = {
  error: string
  field: string
}

export type BaseResponseType<D = {}> = {
  fieldsErrors: FieldErrorType[]
  messages: string[]
  resultCode: number
  data: D
}
