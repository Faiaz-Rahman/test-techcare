import { NoteType } from '@interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import NetInfo from '@react-native-community/netinfo'
import { RootState } from '..'
import ApiService from '@utils/ApiService'

export type SyncAction =
  | { type: 'create'; note: NoteType }
  | { type: 'update'; note: NoteType; updatedFields: Partial<NoteType> }
  | { type: 'delete'; noteId: string }
  | { type: 'bookmark'; noteId: string }

export type noteState = {
  notes: Array<NoteType>
  bookmarks: Array<NoteType>
  syncQueue: Array<SyncAction>
}

const initialState: noteState = {
  notes: [],
  bookmarks: [],
  syncQueue: [],
}

export const createNote = createAsyncThunk(
  '/notes/create',
  async (note: NoteType, { dispatch, getState }) => {
    const state = await NetInfo.fetch()

    if (!state.isConnected) {
      dispatch(addToSyncQueue({ type: 'create', note }))
      dispatch(addingNotes(note)) // failure hoileo local state update kore rakhlam
      return
    }

    const { auth } = getState() as RootState
    const response = await ApiService.post(
      '/notes',
      JSON.stringify({
        title: note?.title,
        details: note?.details,
      }),
      {
        headers: { Authorization: `Bearer ${auth.user?.access_token}` },
      },
    )

    dispatch(addingNotes(response.data))
    return response.data
  },
)

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addingNotes: (state, actions: PayloadAction<any>) => {
      state.notes = [...state.notes, actions.payload]
    },
    removingNotes: (state, actions: PayloadAction<NoteType>) => {
      const notesInState = [...state.notes]
      const remainingNotesAfterRemovingParticular = notesInState.filter(
        note => note.id != actions.payload?.id,
      )
      state.notes = remainingNotesAfterRemovingParticular
    },
    editNote: (
      state,
      actions: PayloadAction<{
        index: number
        updatedTitle: string
        updatedContent: string
      }>,
    ) => {
      const { index, updatedTitle, updatedContent } = actions?.payload

      if (updatedTitle) {
        state.notes[index].title = updatedTitle
      }

      if (updatedContent) {
        state.notes[index].details = updatedContent
      }
    },
    addBookmark: (state, actions: PayloadAction<NoteType>) => {
      state.bookmarks = [...state.bookmarks, actions.payload]
    },
    removeBookmark: (state, actions: PayloadAction<NoteType>) => {
      const bookmarksInState = [...state.bookmarks]
      const remainingBookmarksAfterRemovingParticular = bookmarksInState.filter(
        note => note.id != actions.payload?.id,
      )
      state.bookmarks = remainingBookmarksAfterRemovingParticular
    },
    addToSyncQueue: (state, actions: PayloadAction<SyncAction>) => {
      const action = actions.payload
      if (action.type === 'update') {
        state.syncQueue = state.syncQueue.filter(
          item =>
            !(
              item.type === 'update' &&
              'note' in item &&
              item.note.id === action.note.id
            ),
        )
      }
      state.syncQueue.push(action)
    },
    clearSyncQueue: state => {
      state.syncQueue = []
    },
  },
})

export const {
  addingNotes,
  removingNotes,
  editNote,
  addBookmark,
  removeBookmark,
  addToSyncQueue,
  clearSyncQueue,
} = noteSlice.actions

export default noteSlice.reducer
