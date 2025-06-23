import { NavigationContainer } from '@react-navigation/native'

import AuthRoute from './AuthRoute'
import { UserRoute } from './UserRoute'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { ConnectivityProvider } from '@utils/ConnectivityContext'

export const Routes = (): React.JSX.Element => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <ConnectivityProvider>
      <NavigationContainer>
        {/* {user?.access_token ? <UserRoute /> : <AuthRoute />} */}
        <UserRoute />
      </NavigationContainer>
    </ConnectivityProvider>
  )
}
