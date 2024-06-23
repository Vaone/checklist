import { T_Todolist } from 'features/todolistList/api/todolistApi.types'
import {
  todolistThunks,
  todolistReducer,
  TLInitialStateType,
  FilterValues,
  todolistAction,
} from 'features/todolistList/model/todolistsSlice'
import { v1 } from 'uuid'
import { RequestStatusType } from 'app/model/appSlice'

let todolistId1: string
let todolistId2: string
let startState: TLInitialStateType

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = {
    todolists: [
      { id: todolistId1, title: 'What to learn', filter: 'all', status: 'idle', addedDate: new Date(''), order: 0 },
      { id: todolistId2, title: 'What to buy', filter: 'all', status: 'idle', addedDate: new Date(''), order: 0 },
    ],
  }
})

test('correct todolist should be removed', () => {
  type DeleteTL = Omit<ReturnType<typeof todolistThunks.deleteTodolist.fulfilled>, 'meta'>
  const action: DeleteTL = {
    type: todolistThunks.deleteTodolist.fulfilled.type,
    payload: { id: todolistId1 },
  }

  const endState = todolistReducer(startState, action).todolists

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
  type AddTL = Omit<ReturnType<typeof todolistThunks.addTodolist.fulfilled>, 'meta'>
  let todolist: T_Todolist = {
    title: 'New Todolist',
    id: 'any id',
    addedDate: new Date(''),
    order: 0,
  }

  const action: AddTL = {
    type: todolistThunks.addTodolist.fulfilled.type,
    payload: { todolist },
  }

  const endState = todolistReducer(startState, action).todolists

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
  expect(endState[0].filter).toBe('all')
})
test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  type ChangeTLTitle = Omit<ReturnType<typeof todolistThunks.changeTodolistTitle.fulfilled>, 'meta'>

  const action: ChangeTLTitle = {
    type: todolistThunks.changeTodolistTitle.fulfilled.type,
    payload: { id: todolistId2, title: newTodolistTitle },
  }

  const endState = todolistReducer(startState, action).todolists

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValues = 'completed'

  const action = todolistAction.changeTodolistFilter({ id: todolistId2, filter: newFilter })

  const endState = todolistReducer(startState, action).todolists

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
test('todolists should be added', () => {
  type FetchTL = Omit<ReturnType<typeof todolistThunks.fetchTodolist.fulfilled>, 'meta'>

  const action: FetchTL = {
    type: todolistThunks.fetchTodolist.fulfilled.type,
    payload: startState,
  }

  const endState = todolistReducer({ todolists: [] }, action).todolists

  expect(endState.length).toBe(2)
})
test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading'

  const action = todolistAction.setTodolistStatus({ id: todolistId2, status: newStatus })

  const endState = todolistReducer(startState, action).todolists

  expect(endState[0].status).toBe('idle')
  expect(endState[1].status).toBe(newStatus)
})
