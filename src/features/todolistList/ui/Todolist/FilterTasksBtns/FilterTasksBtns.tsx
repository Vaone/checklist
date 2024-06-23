import { useActions } from 'common/hooks/useActions'
import { FilterValues, TodoList } from 'features/todolistList/model/todolistsSlice'
import { BtnsList, FilterStatus } from '../Todolist.style'
import { CustomButton as Button } from 'common/components/Button/Button'

const FilterTasksBtns = ({ todolist }: { todolist: TodoList }) => {
  const { filter, id } = todolist
  const { changeTodolistFilter } = useActions()

  const changeTodoListFilter = (filter: FilterValues) => {
    changeTodolistFilter({ id, filter })
  }

  return (
    <>
      <FilterStatus>
        <div>Filter: {filter}</div>
      </FilterStatus>

      <BtnsList>
        <Button
          onClick={() => changeTodoListFilter('all')}
          variant={filter === 'all' ? 'contained' : 'outlined'}
          color="success"
        >
          All
        </Button>
        <Button
          onClick={() => changeTodoListFilter('active')}
          variant={filter === 'active' ? 'contained' : 'outlined'}
          color="error"
        >
          Active
        </Button>
        <Button
          onClick={() => changeTodoListFilter('completed')}
          variant={filter === 'completed' ? 'contained' : 'outlined'}
        >
          Complited
        </Button>
      </BtnsList>
    </>
  )
}

export default FilterTasksBtns
