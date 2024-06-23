import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

export const selectTasklists = (state: RootState) => state.tasklists

export const selectTaskById = createSelector(
  [selectTasklists, (_, taskListsId: string, id: string) => taskListsId, (_, taskListsId: string, id: string) => id],
  (tasklists, taskListsId, id) => {
    return tasklists[taskListsId].find((t) => t.id === id)
  },
)
