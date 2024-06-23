import { T_Todolist } from 'features/todolistList/api/todolistApi.types'
import { ResponseResultCode } from 'common/enums/enums'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestStatusType } from 'app/model/appSlice'
import { todolistAPI } from 'features/todolistList/api/todolistApi'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'

const slice = createSlice({
  name: 'todolist',
  initialState: {
    todolists: [] as TodoList[],
  },
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValues }>) => {
      const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state.todolists[index].filter = action.payload.filter
    },
    setTodolistStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state.todolists[index].status = action.payload.status
    },
    clearState: () => {
      return { todolists: [] }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodolist.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state.todolists.push({ ...tl, filter: 'all', status: 'idle' })
        })
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) state.todolists[index].title = action.payload.title
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.todolists.unshift({ ...action.payload.todolist, filter: 'all', status: 'idle' })
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) state.todolists.splice(index, 1)
      })
  },
})

export const todolistReducer = slice.reducer
export const todolistAction = slice.actions
export const todolistSelector = slice.selectors

// thunks
const fetchTodolist = createAppAsyncThunk<{ todolists: T_Todolist[] }, undefined>(
  `${slice.name}/getTodolist`,
  async (_, { rejectWithValue }) => {
    const res = await todolistAPI.getTodolists()
    if (res.data) {
      return { todolists: res.data }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
const changeTodolistTitle = createAppAsyncThunk<{ id: string; title: string }, { id: string; title: string }>(
  `${slice.name}/changeTodolistTitle`,
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await todolistAPI.updateTodolist(args.id, args.title)
    if (res.data.resultCode === 0) {
      return { id: args.id, title: args.title }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
const addTodolist = createAppAsyncThunk<{ todolist: T_Todolist }, { title: string }>(
  `${slice.name}`,
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await todolistAPI.createTodolist(args.title)
    if (res.data.resultCode === ResponseResultCode.success) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
const deleteTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
  `${slice.name}/deleteTodolist`,
  async (args, { dispatch, rejectWithValue }) => {
    dispatch(todolistAction.setTodolistStatus({ id: args.id, status: 'loading' }))
    const res = await todolistAPI.deleteTodolist(args.id)
    dispatch(todolistAction.setTodolistStatus({ id: args.id, status: 'idle' }))
    if (res.data.resultCode === ResponseResultCode.success) {
      return { id: args.id }
    } else {
      return rejectWithValue(null)
    }
  },
)

export const todolistThunks = { fetchTodolist, changeTodolistTitle, addTodolist, deleteTodolist }

//types
export type FilterValues = 'all' | 'active' | 'completed'
export type TodoList = T_Todolist & {
  filter: FilterValues
  status: RequestStatusType
}
export type TLInitialStateType = ReturnType<typeof slice.getInitialState>
