import Button from '@components/common/Button'
import NoteItem from '@components/common/NoteItem'
import AppText from '@components/ui/Text'

import HomeLayout from '@layouts/HomeLayout'
import { RootState } from '@store/index'

import { StyleSheet, View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { useSelector } from 'react-redux'

export default function Bookmark() {
  const { bookmarks } = useSelector((state: RootState) => state.note)

  return (
    <HomeLayout noScroll headerTitle="Bookmarks">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Button style={styles.uploadButton} title="Sync" onPress={() => {}} />
      </View>

      <Animated.FlatList
        data={bookmarks}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <NoteItem note={item} index={index} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        itemLayoutAnimation={LinearTransition}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText>Nothing to show</AppText>
          </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
