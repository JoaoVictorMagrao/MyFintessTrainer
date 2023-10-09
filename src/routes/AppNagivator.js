import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// TELAS
import HomeScreen from '../screens/Home/index';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/Login/index';
// import Toast from 'react-native-toast-message';
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
              headerShown: false,
              statusBarStyle: 'dark',
          }}  initialRouteName="Login">
          
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </NavigationContainer>
  );
}

export default AppNavigator;