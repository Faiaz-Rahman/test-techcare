import { Colors, Dim } from '@constants'
import { RootState } from '@store/index'

import {
  Keyboard,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputContentSizeChangeEventData,
  ToastAndroid,
  View,
} from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import Ionicons from '@react-native-vector-icons/ionicons'

import {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useRef, useState, useEffect } from 'react'

import Animated from 'react-native-reanimated'
import { NoteItemType } from '@interfaces'
import Button from '../Button'
import { addBookmark, editNote, removeBookmark } from '@store/slices/noteSlice'
import { useConnectivity } from '@utils/ConnectivityContext'

export default function NoteItem({ note, index }: NoteItemType) {
  const sharedValue = useSharedValue<number>(0)
  const { isConnected, isInternetReachable } = useConnectivity()

  const { userTheme } = useSelector((state: RootState) => state.auth)
  const { bookmarks } = useSelector((state: RootState) => state.note)

  const [noteText, setNoteText] = useState<string>(
    note?.details ? note?.details?.slice(0, 25) + ' ...' : '',
  )
  const [expand, setExpand] = useState<boolean>(false)

  const [title, setTitle] = useState<string>(note?.title ? note?.title : '')
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    bookmarks?.filter(n => n.id == note.id).length ? true : false,
  )

  const inputRef = useRef<TextInput | null>(null)
  const [editable, setEditable] = useState<boolean>(false)
  const dispatch = useDispatch()

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

  const onExpand = () => {
    sharedValue.value = withTiming(
      expand ? 0 : 1,
      {
        duration: 200,
        easing: expand ? Easing.linear : Easing.ease,
      },
      () => {},
    )

    setExpand(prev => !prev)
  }

  const rotateArrow = useAnimatedStyle(() => {
    const rotation = interpolate(
      sharedValue.value,
      [0, 1],
      [0, 90],
      Extrapolation.CLAMP,
    )

    return {
      transform: [{ rotate: `${rotation}deg` }],
    }
  })

  const slideInMenu = useAnimatedStyle(() => {
    const translation = interpolate(
      sharedValue.value,
      [0, 1],
      [-20, 0],
      Extrapolation.CLAMP,
    )

    return {
      width: Dim.width * 0.85,
      opacity: sharedValue.value,
      transform: [{ translateY: translation }],
    }
  })
  const handleContentSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    //got all the measurements
    // const value = event.currentTarget.measure(
    //   (x, y, width, height, pageX, pageY) => {
    //     console.log(
    //       '🚀 ~ NoteItem ~ x,y,width,height,pageX,pageY:',
    //       x,
    //       y,
    //       width,
    //       height,
    //       pageX,
    //       pageY,
    //     )
    //   },
    // )
  }

  const onEdit = () => {
    setEditable(true)
  }

  const onUpdate = () => {
    if (!isConnected) {
    }

    dispatch(
      editNote({
        index,
        updatedContent: noteText,
        updatedTitle: title,
      }),
    )

    sharedValue.value = withTiming(
      expand ? 0 : 1,
      {
        duration: 200,
        easing: expand ? Easing.linear : Easing.ease,
      },
      () => {},
    )

    setExpand(prev => !prev)

    ToastAndroid.showWithGravity('Updated successfully ...', 1500, 10)
  }

  const onBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(note))
      ToastAndroid.showWithGravity('Removed from bookmarks ...', 1500, 10)
    } else {
      dispatch(addBookmark(note))
      ToastAndroid.showWithGravity('Added into bookmarks ...', 1500, 10)
    }

    setIsBookmarked(prev => !prev)

    sharedValue.value = withTiming(
      expand ? 0 : 1,
      {
        duration: 200,
        easing: expand ? Easing.linear : Easing.ease,
      },
      () => {},
    )

    setExpand(prev => !prev)
  }

  useEffect(() => {
    if (editable) {
      setTimeout(() => {
        inputRef?.current?.focus()
      }, 0)

      setNoteText(note?.details)
    }
  }, [editable])

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      inputRef.current?.blur()
    })

    return () => {
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [])

  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={[
          styles.noteItem,
          {
            borderColor: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
          },
        ]}>
        <TextInput
          ref={inputRef}
          multiline
          value={noteText}
          editable={editable}
          cursorColor={Colors.socialPink}
          placeholder="Note it down here ..."
          placeholderTextColor={'#6e6e6e'}
          onContentSizeChange={handleContentSizeChange}
          style={{
            ...styles.input,
            color: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
          }}
          onChangeText={text => setNoteText(text)}
        />

        <AnimatedPressable onPress={onExpand} style={[{ ...rotateArrow }]}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={userTheme == 'dark' ? Colors.white : Colors.darkBlack}
          />
        </AnimatedPressable>
      </View>

      {/* animated bottom menu bar */}
      {expand && (
        <Animated.View
          style={{
            ...slideInMenu,
          }}>
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
              borderColor:
                userTheme == 'dark' ? Colors.white : Colors.darkBlack,
              borderRadius: 5,
            }}
            onChangeText={text => setTitle(text)}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Button
              style={styles.uploadButton}
              title="Update"
              onPress={onUpdate}
            />

            {/* bookmark */}
            <Pressable
              onPress={onBookmark}
              style={[
                styles.iconsWrapper,
                {
                  borderColor:
                    userTheme == 'dark' ? Colors.white : Colors.darkBlack,
                },
              ]}>
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={userTheme == 'dark' ? Colors.white : Colors.darkBlack}
              />
            </Pressable>

            <Pressable
              onPress={onEdit}
              style={[
                styles.iconsWrapper,
                {
                  borderColor:
                    userTheme == 'dark' ? Colors.white : Colors.darkBlack,
                },
              ]}>
              <Ionicons
                name="pencil"
                size={20}
                color={userTheme == 'dark' ? Colors.white : Colors.darkBlack}
              />
            </Pressable>

            <Pressable
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
        </Animated.View>
      )}
    </View>
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
})
