import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "./Home"
import CameraScreen from './CameraScreen'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Home Screen' }}    />
        <Stack.Screen name='Camera' component={CameraScreen}     />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator