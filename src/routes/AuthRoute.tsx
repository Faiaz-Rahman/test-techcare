import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@screens/auth/Login'
import Register from '@screens/auth/Register'

const AuthStack = createNativeStackNavigator()

const AuthRoute = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left',
      }}>
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="signup" component={Register} />
    </AuthStack.Navigator>
  )
}

export default AuthRoute
