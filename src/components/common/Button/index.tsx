import AppText from '@components/ui/Text'
import { Colors, Dim } from '@constants'
import { RootState } from '@store/index'
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'

interface ButtonProps {
  onPress: () => void
  title: string
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
}

export default function Button({
  onPress,
  title,
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const { userTheme } = useSelector((state: RootState) => state.auth)

  return (
    <Pressable
      style={[styles.button, { ...style }]}
      onPress={onPress}
      disabled={disabled}>
      <LinearGradient
        colors={Colors.gradient}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        {loading ? (
          <ActivityIndicator size={'small'} color={Colors.white} />
        ) : (
          <AppText
            styles={{
              fontSize: 16,
              fontFamily: 'Roboto-SemiBold',
              color: Colors.white,
            }}>
            {title}
          </AppText>
        )}
      </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: Dim.width * 0.85,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
