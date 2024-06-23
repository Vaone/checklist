import { useEffect } from 'react'
import { useAppSelector } from 'common/hooks/useAppHooks'
import { authSelector } from '../model/authSlice'
import { useFormik } from 'formik'
import { BaseResponseType } from 'common/components/Types/common.types'
import { useActions } from 'common/hooks/useActions'
import * as Yup from 'yup'

export const useLogin = () => {
  const isLogged = useAppSelector(authSelector.isLogged)
  const { setRequestStatus, login } = useActions()

  useEffect(() => {
    setRequestStatus({ status: 'success' })
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(3, 'must be 3 characters more')
        .max(20, 'Must be 20 characters less')
        .required('Required'),
    }),
    onSubmit: (values, formikHelpers) => {
      login({ data: values })
        .unwrap()
        .catch((err: BaseResponseType) => {
          err.fieldsErrors?.forEach((el) => {
            formikHelpers.setFieldError(el.field, el.error)
          })
        })
    },
  })

  return { isLogged, formik }
}
