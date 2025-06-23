import { Dimensions } from 'react-native'

export const Dim = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  fontScale: Dimensions.get('window').fontScale,
  scale: Dimensions.get('window').scale,
}

export const Colors = {
  darkBlack: '#181A1C',
  pureBlack: '#000',
  socialBlue: '#2E8AF6',
  socialPink: '#F62E8E',
  socialWhite: '#ECEBED',
  white: '#fff',
  darkGray: '#323436',
  lighterGray: '#727477',
  gradient: ['#F62E8E', '#F62E8E', '#AC1AF0'],
}

export const Api_Link = {
  loginEndPoint: '/auth/login',
  registerEndpoint: '/auth/register',
}
