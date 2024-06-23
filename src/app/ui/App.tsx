import './App.css'
import Header from 'app/header/Header'
import { CircularProgress, LinearProgress } from '@mui/material'
import { useAppSelector } from 'common/hooks/useAppHooks'
import ErrorSnackbar from 'common/components/ErrorSnackbar/ErrorSnackbar'
import { useEffect } from 'react'
import { useActions } from 'common/hooks/useActions'
import { appSelector } from '../model/appSlice'
import { SContainer, StyledApp } from './App.styles'
import AppRouter from './AppRouter'

const App = () => {
  const status = useAppSelector(appSelector.status)
  const error = useAppSelector(appSelector.error)
  const isInitialized = useAppSelector(appSelector.isInitialized)
  const { initializeApp } = useActions()

  useEffect(() => {
    initializeApp()
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <StyledApp>
      <Header />
      {status === 'loading' && <LinearProgress color="secondary" />}

      <SContainer>
        <AppRouter />
      </SContainer>

      {error !== null && <ErrorSnackbar error={error} />}
    </StyledApp>
  )
}

export default App
