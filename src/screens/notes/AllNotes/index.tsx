import Animated, { LinearTransition } from 'react-native-reanimated'

import NoteItem from '@components/common/NoteItem'
import AppText from '@components/ui/Text'
import HomeLayout from '@layouts/HomeLayout'
import Ionicons from '@react-native-vector-icons/ionicons'

import { StyleSheet, ToastAndroid, View } from 'react-native'
import Button from '@components/common/Button'

import { useConnectivity } from '@utils/ConnectivityContext'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@store/index'
import { processSyncQueue } from '@utils/SyncQueue'
import NewNote from '@components/common/NewNote'
import { useState } from 'react'

export default function AllNotes() {
  const { isConnected, isInternetReachable } = useConnectivity()

  const { user } = useSelector((state: RootState) => state.auth)
  const { notes } = useSelector((state: RootState) => state.note)
  const [animated, setAnimated] = useState<boolean>(false)

  const [showNew, setShowNew] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const handleSync = async () => {
    if (!isConnected || !isInternetReachable) {
      ToastAndroid.show(
        'You are offline. Connect to internet to sync.',
        ToastAndroid.SHORT,
      )
      return
    }

    if (!user?.access_token) {
      ToastAndroid.show('Login required to sync data.', ToastAndroid.SHORT)
      return
    }

    try {
      await processSyncQueue(user.access_token, dispatch)
      ToastAndroid.show('Notes synced successfully.', ToastAndroid.SHORT)
    } catch (err) {
      ToastAndroid.show('Sync failed. Try again later.', ToastAndroid.SHORT)
    }
  }

  const onDelete = () => {
    console.log('on delete!!!')
    setShowNew(false)
  }

  return (
    <HomeLayout
      noScroll
      floatingButton
      floatingButtonComponent={<Ionicons name="add-circle" size={30} />}
      floatingButtonOnPress={() => {
        console.log('pressing floating button')

        setAnimated(true)
        setShowNew(true)
      }}
      showSearchOnHeader={true}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <AppText
          styles={{
            fontSize: 20,
            marginBottom: 20,
            fontFamily: 'Roboto-Bold',
          }}>
          All Notes
        </AppText>
        <Button style={styles.uploadButton} title="Sync" onPress={handleSync} />
      </View>

      <Animated.FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <NoteItem note={item} index={index} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            // backgroundColor: 'yellow',
            // minHeight: Dim.height,
          }
        }
        itemLayoutAnimation={LinearTransition}
        ListEmptyComponent={
          !showNew ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText>No Notes to show ...</AppText>
            </View>
          ) : (
            <NewNote onDelete={onDelete} animated={animated} />
          )
        }
      />
    </HomeLayout>
  )
}

const styles = StyleSheet.create({
  uploadButton: {
    height: 45,
    width: '30%',
  },
})
