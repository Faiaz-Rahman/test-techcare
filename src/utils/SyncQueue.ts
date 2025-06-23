// utils/SyncQueue.ts
import ApiService from './ApiService'
import { AppDispatch, RootState, store } from '@store/index'
import { clearSyncQueue } from '@store/slices/noteSlice'
import { ToastAndroid } from 'react-native'

export const processSyncQueue = async (
  token: string,
  dispatch: AppDispatch,
) => {
  const { getState } = store

  try {
    const { syncQueue } = getState().note
    if (!syncQueue.length) return

    for (const action of syncQueue) {
      try {
        switch (action.type) {
          case 'create': {
            await ApiService.post('/notes', action.note, {
              headers: { Authorization: `Bearer ${token}` },
            })
            break
          }
          case 'update': {
            await ApiService.put(
              `/notes/${action.note.id}`,
              action.updatedFields,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            )
            break
          }
          case 'delete': {
            await ApiService.delete(`/notes/${action.noteId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            break
          }
          case 'bookmark': {
            await ApiService.post(
              `/notes/${action.noteId}/bookmark`,
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            )
            break
          }
        }
      } catch (err) {
        console.error('Sync action failed:', action, err)
        ToastAndroid.show(
          'A sync item failed. Remaining items are kept.',
          ToastAndroid.SHORT,
        )
        return
      }
    }

    dispatch(clearSyncQueue())
  } catch (err) {
    console.error('Failed to process Redux sync queue:', err)
  }
}
