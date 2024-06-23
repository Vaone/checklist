import { useCallback } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import AddItemForm from 'common/components/AddItemForm/AddItemForm'
import { StyledTitle } from '../Todolist/Todolist.style'
import { useActions } from 'common/hooks/useActions'

const AddTodolist = () => {
  const { addTodolist } = useActions()
  const addTodoList = useCallback((title: string) => {
    return addTodolist({ title }).unwrap()
  }, [])

  return (
    <Container>
      <Grid
        container
        style={{
          display: 'flex',
          marginTop: '30px',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <StyledTitle>New TodoList: </StyledTitle>
        <AddItemForm addInputText={addTodoList} />
      </Grid>
    </Container>
  )
}

export default AddTodolist
