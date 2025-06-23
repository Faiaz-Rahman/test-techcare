import { useState } from 'react'
import { Pressable, View, ToastAndroid } from 'react-native'

import Button from '@components/common/Button'
import TextInput from '@components/ui/TextInputField'
import AuthLayout from '@layouts/AuthLayout'
import AppText from '@components/ui/Text'

import Ionicons from '@react-native-vector-icons/ionicons'
import { useFormik } from 'formik'
import { validationSchemaForLogin } from 'src/schema'

import { RootState, useAppDispatch } from '@store/index'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { login } from '@store/slices/authSlice'

export default function Login() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  // const dispatchAction = useDispatch();

  const { userTheme } = useSelector((state: RootState) => state.auth)

  const loginForm = useFormik({
    initialValues: {
      email: '',
      pass: '',
    },
    validationSchema: validationSchemaForLogin,
    onSubmit: async values => {
      await onPressLogin(values)
    },
  })

  const onPressLogin = async (values: { email: string; pass: string }) => {
    setLoading(true)

    dispatch(
      login({
        email: values.email,
        password: values.pass,
      }),
    )
      .unwrap()
      .then(resp => {
        // console.log('resp login =>', resp)
        setLoading(false)
      })
      .catch(error => {
        // console.log('error => Login =>', error?.message)
        ToastAndroid.showWithGravity(error?.message, 1500, 10)

        setLoading(false)
      })
  }

  return (
    <AuthLayout>
      <AppText
        styles={{
          fontSize: 50,
          fontFamily: 'Roboto-Bold',
        }}>
        Note It
      </AppText>

      <AppText styles={{ marginBottom: 50 }}>
        Lorem ipsum dolor, sit amet consectetur.
      </AppText>

      <TextInput
        icon={
          <Ionicons
            name="mail"
            size={20}
            color={userTheme == 'dark' ? '#fff' : '#000'}
          />
        }
        placeholder="example@example.com"
        onChangeText={text => {
          loginForm.setFieldValue('email', text)
        }}
        errorMessage={loginForm.errors.email}
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
          //   setPassword(text)
          loginForm.setFieldValue('pass', text)
        }}
        errorMessage={loginForm.errors.pass}
      />

      <Button
        onPress={() => {
          loginForm.handleSubmit()
        }}
        title="Log in"
        disabled={loading}
        loading={loading}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
        <AppText>Don't have an account?</AppText>
        <Pressable
          onPress={() => {
            navigation.navigate('signup' as never)
          }}>
          <AppText
            styles={{
              textDecorationLine: 'underline',
            }}>
            Sign up
          </AppText>
        </Pressable>
      </View>
    </AuthLayout>
  )
}
