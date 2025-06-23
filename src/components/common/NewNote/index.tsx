import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Dim } from '@constants'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

import Ionicons from '@react-native-vector-icons/ionicons'
import Button from '../Button'
import {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import Animated from 'react-native-reanimated'

interface NewNoteType {
  onDelete: () => void
  animated: boolean
}

export default function NewNote({ onDelete, animated }: NewNoteType) {
  const [noteText, setNoteText] = useState<string>('')
  const { userTheme } = useSelector((state: RootState) => state.auth)
  const [title, setTitle] = useState<string>('')

  const shared = useSharedValue(0)

  const animation = useAnimatedStyle(() => {
    const translate = interpolate(
      shared.value,
      [0, 1],
      [-20, 0],
      Extrapolation.EXTEND,
    )

    return { transform: [{ translateY: translate }], opacity: shared.value }
  })

  useEffect(() => {
    if (animated) {
      shared.value = withTiming(1, {
        duration: 200,
        easing: Easing.ease,
      })
    }
  }, [animated])

  return (
    <Animated.View style={{ marginBottom: 10, ...animation }}>
      <View
        style={[
          styles.noteItem,
          {
            borderColor: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
          },
        ]}>
        <TextInput
          multiline
          value={noteText}
          editable={true}
          cursorColor={Colors.socialPink}
          placeholder="Note it down here ..."
          placeholderTextColor={'#6e6e6e'}
          style={{
            ...styles.input,
            color: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
          }}
          onChangeText={text => setNoteText(text)}
        />
      </View>

      <View style={{}}>
        <TextInput
          value={title}
          cursorColor={Colors.socialPink}
          placeholder="Title goes here ..."
          placeholderTextColor={'#6e6e6e'}
          style={{
            ...styles.input,
            color: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
            marginTop: 10,
            width: '100%',
            borderWidth: 2,
            borderColor: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
            borderRadius: 5,
          }}
          onChangeText={text => setTitle(text)}
        />

        <View style={styles.bottomWrapper}>
          <Button style={styles.uploadButton} title="Add" onPress={() => {}} />

          <Pressable
            onPress={onDelete}
            style={[
              styles.iconsWrapper,
              {
                borderColor:
                  userTheme == 'dark' ? Colors.white : Colors.darkBlack,
              },
            ]}>
            <Ionicons
              name="trash"
              size={20}
              color={userTheme == 'dark' ? Colors.white : Colors.darkBlack}
            />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: 'row',
    width: Dim.width * 0.845,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  expandWrapper: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  iconsWrapper: {
    height: 45,
    width: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  input: {
    width: '75%',
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,
    fontSize: 14,
  },
  uploadButton: {
    height: 45,
    width: '30%',
    marginRight: 'auto',
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: 'red',
  },
})
