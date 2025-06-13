import {Dimensions} from 'react-native';

export const Colors = {
  dark: '#172233',
  light: '#f6f8fa',
};

export const Dim = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  fontScale: Dimensions.get('window').fontScale,
  scale: Dimensions.get('window').scale,
};
