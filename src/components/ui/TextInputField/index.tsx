import { useState } from 'react'

import {
  View,
  StyleSheet,
  TextInput as TextInputRN,
  Pressable,
} from 'react-native'

import Ionicons from '@react-native-vector-icons/ionicons'
import AppText from '@components/ui/Text'
import { Colors, Dim } from '@constants'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'

interface TextInputField {
  icon: React.ReactNode
  isPassword?: boolean
  placeholder: string
  onChangeText: (text: string) => void
  errorMessage?: string
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export default function TextInput({
  icon,
  isPassword = false,
  placeholder,
  onChangeText,
  errorMessage,
  keyboardType,
  autoCapitalize = 'none',
}: TextInputField) {
  const [selected, setSelected] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { userTheme } = useSelector((state: RootState) => state.auth)
  //   console.log('userTheme from store =>', userTheme);

  return (
    <View>
      <View
        style={[
          styles.textInputWrapper,
          {
            borderColor: selected
              ? Colors.socialPink
              : userTheme == 'dark'
                ? '#fff'
                : '#000',
          },
        ]}>
        <View style={styles.iconWrapper}>{icon}</View>

        <TextInputRN
          autoCapitalize={autoCapitalize}
          style={[
            styles.input,
            { color: userTheme == 'dark' ? Colors.white : '#000' },
          ]}
          placeholder={placeholder}
          secureTextEntry={isPassword ? (showPassword ? false : true) : false}
          placeholderTextColor={'#b1aaaa'}
          onBlur={() => {
            setSelected(false)
          }}
          onFocus={() => {
            setSelected(true)
          }}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />

        {isPassword && (
          <Pressable
            style={styles.eyeWrapper}
            onPress={() => {
              setShowPassword(prev => !prev)
            }}>
            {showPassword ? (
              <Ionicons
                name="eye-off"
                color={userTheme == 'dark' ? '#fff' : '#000'}
                size={20}
              />
            ) : (
              <Ionicons
                name="eye"
                color={userTheme == 'dark' ? '#fff' : '#000'}
                size={20}
              />
            )}
          </Pressable>
        )}
      </View>
      <View style={styles.errorWrapper}>
        {errorMessage ? (
          <>
            <Ionicons
              name="warning-outline"
              color={Colors.socialPink}
              size={15}
            />
            <AppText styles={styles.errorMessageTextStyle}>
              {errorMessage}
            </AppText>
          </>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInputWrapper: {
    height: 60,
    width: Dim.width * 0.85,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  iconWrapper: {
    height: 60,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  eyeWrapper: {
    height: 60,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  input: {
    //   backgroundColor: 'red',
    height: '100%',
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  errorWrapper: {
    height: 20,
    width: Dim.width * 0.85,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  errorMessageTextStyle: {
    marginTop: 2,
    fontSize: 11,
    fontFamily: 'Poppins-Light',
    color: Colors.socialPink,
  },
})
