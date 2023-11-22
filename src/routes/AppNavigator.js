import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/index';
import WorkoutExerciesScreen from '../screens/WorkoutExercises/index';
import LoginScreen from '../screens/Login/index';
import ExerciseDetailsScreen from '../screens/ExerciseDetails/index';
import ProfileScreen from '../screens/Profile/index';
import AboutScreen from '../screens/About/index';
import Tab from './AppTabNavigator';
import HomeNavigator from './HomeNavigator';
import useSession from '../hooks/useSession';
import { UserContext } from '../context/ContextUser';
import { useContext } from 'react';

const Stack = createStackNavigator();

function AppStacks() {
  const navigation = useNavigation();
  const session = useSession();
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    session.verify().then(user => {
      if (user) {
        navigation.navigate('Home');
        setUserData(user);
      } else {
        navigation.navigate('Login');
      }

    })
  }, []);


  return (
    <>
      <Stack.Navigator initialRouteName="Tab" screenOptions={{ headerShown: false, statusBarStyle: 'dark' }}>

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Tab" component={Tab} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function AppNavigator() {

  return (
    <NavigationContainer>
      <AppStacks />
    </NavigationContainer>
  );
}