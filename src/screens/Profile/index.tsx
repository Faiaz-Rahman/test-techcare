import Button from '@components/common/Button'

import HomeLayout from '@layouts/HomeLayout'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Profile() {
  return (
    <HomeLayout noScroll showSearchOnHeader={false} headerTitle="Profile">
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
  profileWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    height: 45,
    width: '30%',
  },
})
