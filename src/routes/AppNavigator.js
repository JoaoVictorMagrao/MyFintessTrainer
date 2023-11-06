import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// TELAS
import HomeScreen from '../screens/Home/index';
import WorkoutExerciesScreen from '../screens/WorkoutExercises/index';
import LoginScreen from '../screens/Login/index';
import ExerciseDetailsScreen from '../screens/ExerciseDetails/index';
import ProfileScreen from '../screens/Profile/index';
import AboutScreen from '../screens/About/index';
import Tab from './AppTabNavigator';
import HomeNavigator from './HomeNavigator';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tab" screenOptions={{
              headerShown: false,
              statusBarStyle: 'dark',
          }}  >
          
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Home" component={HomeNavigator} />
        
        <Stack.Screen name="Tab" component={Tab} />
        {/* <Stack.Screen name="WorkoutExercies" component={WorkoutExerciesScreen} />
        <Stack.Screen name="ExerciseDetailsScreen" component={ExerciseDetailsScreen} /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}