import { TaskPriorities, TaskStatuses } from 'common/enums/enums'
import { todolistAction, todolistThunks } from 'features/todolistList/model/todolistsSlice'
import { tasklistReducer, TaskListType, tasksThunks, TaskWithStatus } from '../tasksSlice'

let startState: TaskListType = {}
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        loadingStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        loadingStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        loadingStatus: 'idle',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        loadingStatus: 'idle',
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        loadingStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        loadingStatus: 'idle',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  const action = tasksThunks.removeTask.fulfilled({ todoListId: 'todolistId2', taskId: '2' }, '', {
    todoListId: '',
    taskId: '',
  })

  const endState = tasklistReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy()
})
test('correct task should be added to correct array', () => {
  const action = tasksThunks.addTask.fulfilled(
    {
      task: {
        todoListId: 'todolistId2',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id exists',
      },
    },
    '',
    { todoListId: 'не важно что передать', title: 'не важно что передать' }, // не важно что передать
  )

  const endState = tasklistReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
  type UpdateTask = Omit<ReturnType<typeof tasksThunks.updateTask.fulfilled>, 'meta'>
  // const action: UpdateTask = tasksThunks.updateTask.fulfilled(
  //   {
  //     task: {
  //       id: '2',
  //       title: 'CSS',
  //       status: TaskStatuses.Completed,
  //       todoListId: 'todolistId2',
  //       description: '',
  //       startDate: '',
  //       deadline: '',
  //       addedDate: '',
  //       order: 0,
  //       priority: TaskPriorities.Low,
  //     },
  //   },
  //   '',
  //   { todoListId: '', taskId: '', model: {} },
  // )
  const action: UpdateTask = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      task: {
        id: '2',
        title: 'CSS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    },
  }

  const endState = tasklistReducer(startState, action)

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
})
test('title of specified task should be changed', () => {
  const action = tasksThunks.updateTask.fulfilled(
    {
      task: {
        id: '2',
        title: 'yogurt',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
      },
    },
    '',
    { taskId: '', todoListId: '', model: {} },
  )

  const endState = tasklistReducer(startState, action)

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('yogurt')
  expect(endState['todolistId2'][0].title).toBe('bread')
})
test('new array should be added when new todolist is added', () => {
  type AddTL = Omit<ReturnType<typeof todolistThunks.addTodolist.fulfilled>, 'meta'>
  const action: AddTL = {
    type: todolistThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: 'blabla',
        title: 'new todolist',
        order: 0,
        addedDate: new Date('2022-03-01T12:30:00Z'),
      },
    },
  }

  const endState = tasklistReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test('propertry with todolistId should be deleted', () => {
  type DeteleTL = Omit<ReturnType<typeof todolistThunks.deleteTodolist.fulfilled>, 'meta'>
  const action: DeteleTL = {
    type: todolistThunks.deleteTodolist.fulfilled.type,
    payload: { id: 'todolistId2' },
  }

  const endState = tasklistReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
test('empty arrays should be added when we set todolists', () => {
  type FetchTL = Omit<ReturnType<typeof todolistThunks.fetchTodolist.fulfilled>, 'meta'>
  const action: FetchTL = {
    type: todolistThunks.fetchTodolist.fulfilled.type,
    payload: {
      todolists: [
        { id: '1', title: 'title 1', order: 0, addedDate: new Date('2022-03-01T12:30:00Z') },
        { id: '2', title: 'title 2', order: 0, addedDate: new Date('2022-03-01T12:30:00Z') },
      ],
    },
  }
  const endState = tasklistReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toBeDefined()
  expect(endState['2']).toBeDefined()
})
test('tasks should be added for todolist', () => {
  type FetchTasksActionType = {
    type: string
    payload: { tasks: TaskWithStatus[]; todoListId: string }
  }
  const action: FetchTasksActionType = {
    type: tasksThunks.fetchTasks.fulfilled.type,
    payload: { tasks: startState['todolistId1'], todoListId: 'todolistId1' },
  }

  const endState = tasklistReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action,
  )

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(0)
})
