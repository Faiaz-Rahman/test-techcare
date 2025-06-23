import { useState } from 'react'
import { Pressable, StyleSheet, ToastAndroid, View } from 'react-native'

import AppText from '@components/ui/Text'
import Button from '@components/common/Button'
import TextInput from '@components/ui/TextInputField'

import AuthLayout from '@layouts/AuthLayout'
import { useNavigation } from '@react-navigation/native'

import { useFormik } from 'formik'

import Ionicons from '@react-native-vector-icons/ionicons'

import { RootState, useAppDispatch } from '@store/index'

import { SignUpValidationSchema } from 'src/schema'
import { useSelector } from 'react-redux'
import { register } from '@store/slices/authSlice'

export default function Register() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)
  const { userTheme } = useSelector((state: RootState) => state.auth)

  const dispatch = useAppDispatch()

  const signupForm = useFormik({
    initialValues: {
      email: '',
      pass: '',
      confPass: '',
      name: '',
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async values => {
      await onPressSignUp(values.name, values.email, values.pass)
    },
  })

  const onPressSignUp = async (name: string, email: string, pass: string) => {
    setLoading(true)

    dispatch(
      register({
        email,
        password: pass,
        name,
      }),
    )
      .unwrap()
      .then(_ => {
        // console.log('resp login =>', resp)
        setLoading(false)
      })
      .catch(error => {
        console.log('error => Login =>', error?.message)
        ToastAndroid.showWithGravity(error?.message, 1500, 10)

        setLoading(false)
      })
  }

  return (
    <AuthLayout noScroll={false}>
      <AppText styles={styles.signupText}>
        Sign up now to{'\n'} get started!
      </AppText>

      <TextInput
        icon={
          <Ionicons
            name="text"
            size={20}
            color={userTheme == 'dark' ? '#fff' : '#000'}
          />
        }
        placeholder="name (john doe)"
        onChangeText={text => {
          signupForm.setFieldValue('name', text)
        }}
        errorMessage={signupForm.errors.name}
      />

      <TextInput
        icon={
          <Ionicons
            name="mail"
            size={20}
            color={userTheme == 'dark' ? '#fff' : '#000'}
          />
        }
        placeholder="email (example@example.com)"
        onChangeText={text => {
          signupForm.setFieldValue('email', text)
        }}
        errorMessage={signupForm.errors.email}
        keyboardType="email-address"
      />

      <TextInput
        icon={
          <Ionicons
            name="key"
            size={20}
            color={userTheme == 'dark' ? '#fff' : '#000'}
          />
        }
        placeholder="password ... "
        isPassword
        onChangeText={text => {
          signupForm.setFieldValue('pass', text)
        }}
        errorMessage={signupForm.errors.pass}
      />

      <TextInput
        icon={
          <Ionicons
            name="key"
            size={20}
            color={userTheme == 'dark' ? '#fff' : '#000'}
          />
        }
        placeholder="confirm password ... "
        isPassword
        onChangeText={text => {
          signupForm.setFieldValue('confPass', text)
        }}
        errorMessage={signupForm.errors.confPass}
      />

      <Button
        onPress={() => {
          signupForm.handleSubmit()
        }}
        title="Sign up"
        loading={loading}
        disabled={loading}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginTop: 10,
        }}>
        <AppText>Already have an account?</AppText>
        <Pressable
          onPress={() => {
            navigation.navigate('login' as never)
          }}>
          <AppText
            styles={{
              textDecorationLine: 'underline',
            }}>
            Log in
          </AppText>
        </Pressable>
      </View>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  signupText: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Light',
    lineHeight: 45,
    marginBottom: 20,
  },
})
