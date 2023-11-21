import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/index';
import WorkoutExerciesScreen from '../screens/WorkoutExercises/index';
import ExerciseDetailsScreen from '../screens/ExerciseDetails/index';

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'dark',
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="WorkoutExercies" component={WorkoutExerciesScreen} />
      <Stack.Screen name="ExerciseDetailsScreen" component={ExerciseDetailsScreen} />
    </Stack.Navigator>
  );
}