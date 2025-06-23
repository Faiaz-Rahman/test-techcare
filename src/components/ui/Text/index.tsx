import { RootState } from '@store/index'
import React from 'react'

import { Text, TextStyle } from 'react-native'
import { useSelector } from 'react-redux'

interface AppText {
  children: React.ReactNode
  styles?: TextStyle
}

const defaultStyles = {
  fontSize: 14,
  fontFamily: 'Poppins-Regular',
  color: '#fff',
}

export default function AppText({ children, styles }: AppText) {
  const { userTheme } = useSelector((state: RootState) => state.auth)

  return (
    <Text
      style={[
        defaultStyles,
        { color: userTheme == 'dark' ? '#fff' : '#000' },
        styles,
      ]}>
      {children}
    </Text>
  )
}
