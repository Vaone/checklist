import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Alert } from '@mui/material'
import { FC, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { appAction, appSelector } from 'app/model/appSlice'

type ErrPropsType = {
  error: string
}

const ErrorSnackbar: FC<ErrPropsType> = () => {
  const error = useAppSelector(appSelector.error)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(appAction.setError({ error: null }))
  }

  const action = (
    <Fragment>
      <IconButton size="small" aria-label="close" color="error" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  )

  return (
    <div>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose} message="Error" action={action}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ErrorSnackbar
