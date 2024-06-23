import { appReducer, AppInitialStateType, appAction } from 'app/model/appSlice'

let startState: AppInitialStateType

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
    isInitialized: false,
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, appAction.setError({ error: 'some error' }))
  expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
  const endState = appReducer(startState, appAction.setRequestStatus({ status: 'loading' }))
  expect(endState.status).toBe('loading')
})
