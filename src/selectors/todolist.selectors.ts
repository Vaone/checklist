import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

const selectTasklists = (state: RootState) => state.tasklists

export const selectTasklistsById = createSelector(
  [selectTasklists, (_, id: string) => id],
  (tasklists, id) => tasklists[id],
)
