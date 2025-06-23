import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { Colors, Dim } from 'src/constants'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { updateTheme } from '@store/slices/authSlice'

import { useEffect } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
  noScroll?: boolean
}

export default function AuthLayout({ children, noScroll }: AuthLayoutProps) {
  const { userTheme } = useSelector((state: RootState) => state.auth)
  const isDarkMode = useColorScheme() === 'dark'

  const dispatch = useDispatch()

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
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={userTheme == 'dark' ? 'light-content' : 'dark-content'}
      />

      {noScroll ? (
        <View style={styles.overlay}>{children}</View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={-50}
          contentContainerStyle={
            {
              // backgroundColor: 'rgba(0,0,0,0.8)',
            }
          }
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <View style={[styles.overlay, { flex: 1 }]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingTop: Dim.height * 0.15,
                alignSelf: 'center',
                gap: 5,
              }}>
              {children}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  noScrollWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
})
