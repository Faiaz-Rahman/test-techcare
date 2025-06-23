import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native'

import { Colors, Dim } from '@constants'

import AppText from '@components/ui/Text'

import { HomeLayoutProps } from '@interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { useNavigation } from '@react-navigation/native'

import Ionicons from '@react-native-vector-icons/ionicons'
import { useEffect, useRef, useState } from 'react'
import { updateTheme } from '@store/slices/authSlice'
import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

export default function HomeLayout({
  children,
  noScroll = true,
  showHeader = true,
  backHeader = false,
  headerTitle,
  floatingButton = false,
  floatingButtonComponent,
  floatingButtonOnPress,
  showSearchOnHeader = false,
}: HomeLayoutProps) {
  const { user, userTheme } = useSelector((state: RootState) => state.auth)
  const isDarkMode = useColorScheme() === 'dark'

  const dispatch = useDispatch()
  const searchRef = useRef<TextInput | null>(null)

  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')

  const navigation = useNavigation()

  const handleSearch = () => {
    if (!showSearchBar) {
      setShowSearchBar(true)
    } else {
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      // console.log('the keyboard is hidden !')

      searchRef.current?.blur()
    })

    return () => {
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [])

  useEffect(() => {
    if (showSearchBar) {
      setTimeout(() => {
        searchRef.current?.focus()
      }, 0)
    }
  }, [showSearchBar])

  useEffect(() => {
    dispatch(
      updateTheme({
        theme: isDarkMode ? 'dark' : 'light',
      }),
    )
  }, [userTheme])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: userTheme == 'dark' ? Colors.darkBlack : Colors.white,
        paddingLeft: Dim.width * 0.075,
        paddingRight: Dim.width * 0.075,
        position: 'relative',
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={userTheme == 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      {showHeader && (
        <View style={styles.header}>
          {!showSearchBar ? (
            <AppText styles={styles.greetText}>
              {!headerTitle
                ? `Greetings ... ${user?.userEmail ?? 'User'}`
                : headerTitle}
            </AppText>
          ) : (
            <TextInput
              ref={searchRef}
              onChangeText={text => {
                setSearchText(text)
              }}
              value={searchText}
              placeholder="Search here ..."
              placeholderTextColor={'#6e6e6e'}
              style={{
                width: '70%',
              }}
              cursorColor={Colors.socialPink}
              onBlur={() => {
                // console.log('search bar is being blurred !!!')
                searchRef.current?.blur()
              }}
              keyboardType="web-search"
            />
          )}

          {showSearchOnHeader && (
            <TouchableOpacity
              onPress={handleSearch}
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons
                name="search"
                size={20}
                color={userTheme == 'dark' ? Colors.white : Colors.darkBlack}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {backHeader && (
        <View style={styles.backHeaderWrapper}>
          <Pressable
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              }
            }}>
            <Ionicons name="chevron-back" size={25} color={Colors.white} />
          </Pressable>
        </View>
      )}

      {floatingButton && (
        <View style={styles.floatingButtonWrapper}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
            }}
            onPress={() => {
              if (floatingButtonOnPress) {
                floatingButtonOnPress()
              }
            }}>
            <LinearGradient
              colors={Colors.gradient}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.25, 0.6]}
              style={styles.gradient}>
              <View
                style={[
                  styles.floatingButtonInnerWrapper,
                  {
                    backgroundColor:
                      userTheme == 'dark' ? Colors.darkBlack : Colors.white,
                  },
                ]}>
                <MaskedView
                  maskElement={
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {floatingButtonComponent}
                    </View>
                  }>
                  <LinearGradient
                    colors={Colors.gradient}
                    start={{ x: 0, y: 0.6 }}
                    end={{ x: 0.6, y: 0 }}
                    locations={[0, 0.25, 0.6]}
                    style={{ height: 30, width: 30 }}
                  />
                </MaskedView>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {!noScroll ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Dim.height * 0.1,
          }}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 65,
    width: Dim.width * 0.85,
    alignSelf: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIconWrapper: {
    height: 32,
    width: 32,
    borderColor: Colors.darkGray,
    borderRadius: 32,
    borderWidth: 1,
    backgroundColor: Colors.darkBlack,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    height: 7,
    width: 7,
    backgroundColor: Colors.socialPink,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    top: 7,
    right: 5,
  },
  greetText: {
    fontSize: 17,
    fontFamily: 'Roboto-SemiBold',
  },
  backHeaderWrapper: {
    height: Dim.height * 0.07,
    paddingTop: 30,
    flexDirection: 'row',
    paddingLeft: Dim.width * 0.075,
    alignItems: 'center',
  },
  floatingButtonWrapper: {
    height: 60,
    width: Dim.width,
    position: 'absolute',
    top: '80%',
    justifyContent: 'center',
    paddingRight: 20,
    // backgroundColor: 'red',
    alignItems: 'flex-end',
    zIndex: 10,
  },
  gradient: {
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonInnerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
    borderRadius: 50,
  },
})
