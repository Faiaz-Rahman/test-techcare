import { createContext, useContext, useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'

interface ConnectivityContextType {
  isConnected: boolean
  isInternetReachable: boolean
}

const ConnectivityContext = createContext<ConnectivityContextType>({
  isConnected: true,
  isInternetReachable: true,
})

export const ConnectivityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(true)
  const [isInternetReachable, setIsInternetReachable] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true)
      setIsInternetReachable(state.isInternetReachable ?? true)
    })

    return () => unsubscribe()
  }, [])

  return (
    <ConnectivityContext.Provider value={{ isConnected, isInternetReachable }}>
      {children}
    </ConnectivityContext.Provider>
  )
}

export const useConnectivity = () => useContext(ConnectivityContext)
