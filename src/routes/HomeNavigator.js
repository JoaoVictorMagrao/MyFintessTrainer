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


const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (

      <Stack.Navigator initialRouteName="Home" screenOptions={{
              headerShown: false,
              statusBarStyle: 'dark',
          }}  >
        
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WorkoutExercies" component={WorkoutExerciesScreen} />
        <Stack.Screen name="ExerciseDetailsScreen" component={ExerciseDetailsScreen} />

      </Stack.Navigator>

  );
}
