import EditableField from 'common/components/EditableField/EditableField'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import CheckBox from 'common/components/Checkbox/Checkbox'
import { selectTaskById } from 'selectors/task.selectors'
import { TaskStatuses } from 'common/enums/enums'
import { useAppSelector } from 'common/hooks/useAppHooks'
import { useActions } from 'common/hooks/useActions'
import { StyledLi } from './Task.style'

type Props = {
  taskId: string
  todoListId: string
}

export const Task = ({ taskId, todoListId }: Props) => {
  const task = useAppSelector((state) => selectTaskById(state, todoListId, taskId))
  const { removeTask, updateTask } = useActions()

  const deleteTask = () => {
    removeTask({ todoListId, taskId })
  }

  const updateStatusHandler = (completed: boolean) => {
    const status = completed ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({
      todoListId,
      taskId,
      model: { status },
    })
  }
  const updateTitle = (title: string) => {
    updateTask({ todoListId, taskId, model: { title } })
  }

  return (
    <>
      {task && (
        <StyledLi $isdone={Boolean(task.status)}>
          <CheckBox isdone={Boolean(task.status)} checkboxHandler={updateStatusHandler} />
          <EditableField currentText={task.title} updateEditableField={updateTitle} />

          <IconButton aria-label="delete" onClick={deleteTask} disabled={task.loadingStatus === 'loading'}>
            <DeleteIcon />
          </IconButton>
        </StyledLi>
      )}
    </>
  )
}
