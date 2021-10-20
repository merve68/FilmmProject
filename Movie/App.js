import React from 'react';
import { MovieDetail } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";
import OnBoardingScreen from './screens/OnBoarding';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'OnBoarding'}
      >
        <Stack.Screen
          name="Home"
          component={Tabs}
        />
        <Stack.Screen
          name="OnBorading"
          component={OnBoardingScreen}
        />

        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;