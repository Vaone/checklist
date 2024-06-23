import { TodoList } from '../../model/todolistsSlice'
import { StyledTodolist } from './Todolist.style'
import TodolistTitle from './TodolistTitle/TodolistTitle'
import FilterTasksBtns from './FilterTasksBtns/FilterTasksBtns'
import Tasks from './Tasks/Tasks'

const Todolist = ({ todolist }: { todolist: TodoList }) => {
  return (
    <StyledTodolist>
      <TodolistTitle todolist={todolist} />

      <Tasks todolist={todolist} />

      <FilterTasksBtns todolist={todolist} />
    </StyledTodolist>
  )
}

export default Todolist
