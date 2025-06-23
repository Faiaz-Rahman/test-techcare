import { Colors, Dim } from '@constants'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AllNotes from '@screens/notes/AllNotes'

import { JSX } from 'react'

import Ionicons from '@react-native-vector-icons/ionicons'
import Profile from '@screens/Profile'
import SharedWithMe from '@screens/notes/SharedWithMe'
import Bookmark from '@screens/notes/Bookmarks'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

const Tab = createBottomTabNavigator()

export const UserRoute = (): JSX.Element => {
  const { userTheme } = useSelector((state: RootState) => state.auth)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.lighterGray,
        tabBarStyle: {
          backgroundColor: Colors.darkBlack,
          height: Dim.height * 0.15,
          paddingTop: 10,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="home"
        component={AllNotes}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Ionicons
                name="document"
                size={22}
                color={focused ? Colors.white : Colors.lighterGray}
              />
            )
          },
        }}
      />

      <Tab.Screen
        name="shared"
        component={SharedWithMe}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Ionicons name="share-social-sharp" size={22} color={color} />
            )
          },
        }}
      />

      <Tab.Screen
        name="bookmarks"
        component={Bookmark}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return <Ionicons name="bookmarks" size={22} color={color} />
          },
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return <Ionicons name="person" size={22} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}
