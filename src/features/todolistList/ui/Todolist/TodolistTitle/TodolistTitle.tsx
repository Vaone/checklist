import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import EditableField from 'common/components/EditableField/EditableField'
import { useActions } from 'common/hooks/useActions'
import { TodoList } from 'features/todolistList/model/todolistsSlice'
import { StyledTitle } from '../Todolist.style'

const TodolistTitle = ({ todolist }: { todolist: TodoList }) => {
  const { title, id } = todolist
  const { deleteTodolist, changeTodolistTitle } = useActions()

  const removeTodoListHandler = () => {
    deleteTodolist({ id })
  }
  const updateTodoListTitle = (title: string) => {
    changeTodolistTitle({ id, title })
  }

  return (
    <StyledTitle>
      <EditableField currentText={title} updateEditableField={updateTodoListTitle} />
      <div>
        <IconButton aria-label="delete" onClick={removeTodoListHandler} disabled={status === 'loading'}>
          <DeleteIcon />
        </IconButton>
      </div>
    </StyledTitle>
  )
}

export default TodolistTitle
