import { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch, useAppSelector } from 'common/hooks/useAppHooks'
import { authSelector, authThunks } from 'features/login/model/authSlice'

const Header: FC = () => {
  const isLogged = useAppSelector(authSelector.isLogged)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {isLogged && (
          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
