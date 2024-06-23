import AddTodolist from './AddTL/AddTLForm'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import { useAppSelector } from 'common/hooks/useAppHooks'
import { Navigate } from 'react-router-dom'
import { authSelector } from 'features/login/model/authSlice'
import { useActions } from 'common/hooks/useActions'
import Todolist from './Todolist/Todolist'

const TodolistList = () => {
  const isLogged = useAppSelector(authSelector.isLogged)
  const todolists = useAppSelector((state) => state.todolists.todolists)
  const { fetchTodolist } = useActions()

  useEffect(() => {
    if (!isLogged) {
      return
    }
    fetchTodolist()
  }, [])

  if (!isLogged) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <AddTodolist />

      <Container style={{ marginTop: '15px' }}>
        <Grid container spacing={2}>
          {todolists.map((t) => (
            <Grid item xs={4} key={t.id}>
              <Todolist todolist={t} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default TodolistList
