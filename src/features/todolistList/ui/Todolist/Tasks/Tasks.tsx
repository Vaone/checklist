import { useActions } from 'common/hooks/useActions'
import AddItemForm from 'common/components/AddItemForm/AddItemForm'
import { FilterStatus } from '../Todolist.style'
import { Task } from 'features/todolistList/ui/Todolist/Tasks/Task/Task'
import { useAppSelector } from 'common/hooks/useAppHooks'
import { selectTasklistsById } from 'selectors/todolist.selectors'
import { useCallback, useEffect, useState } from 'react'
import { TodoList } from 'features/todolistList/model/todolistsSlice'
import { CustomButton as Button } from 'common/components/Button/Button'

const Tasks = ({ todolist }: { todolist: TodoList }) => {
  const { filter, id } = todolist
  const tasks = useAppSelector((state) => selectTasklistsById(state, id))
  const { addTask, fetchTasks } = useActions()
  const [collapsedTaskList, setCollapsedTaskList] = useState(true)

  useEffect(() => {
    fetchTasks(id)
  }, [])

  const accordionTaskListHandler = useCallback(() => {
    setCollapsedTaskList(!collapsedTaskList)
  }, [collapsedTaskList])

  const filteredTasks =
    filter === 'completed'
      ? tasks.filter((e) => e.status)
      : filter === 'active'
        ? tasks.filter((e) => !e.status)
        : tasks

  const addTaskHandler = (title: string) => {
    return addTask({ todoListId: id, title }).unwrap()
  }

  return (
    <>
      <p>Add new Task:</p>
      <AddItemForm addInputText={addTaskHandler} disable={status === 'loading'} />

      <FilterStatus>Number Of Tasks: {tasks.length}</FilterStatus>

      <Button variant="outlined" style={{ margin: '10px 0' }} onClick={accordionTaskListHandler}>
        {collapsedTaskList ? 'Hide' : 'Show'}
      </Button>

      {collapsedTaskList && tasks && (
        <ul>
          {filteredTasks.map((task) => {
            return <Task key={task.id} taskId={task.id} todoListId={id} />
          })}
        </ul>
      )}
    </>
  )
}

export default Tasks
