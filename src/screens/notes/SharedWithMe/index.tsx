import HomeLayout from '@layouts/HomeLayout'

import AppText from '@components/ui/Text'

import { StyleSheet, View } from 'react-native'
import Button from '@components/common/Button'

export default function SharedWithMe() {
  return (
    <HomeLayout noScroll={false} headerTitle="Shared With Me">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Button style={styles.uploadButton} title="Sync" onPress={() => {}} />
      </View>
    </HomeLayout>
  )
}

const styles = StyleSheet.create({
  uploadButton: {
    height: 45,
    width: '30%',
  },
})
