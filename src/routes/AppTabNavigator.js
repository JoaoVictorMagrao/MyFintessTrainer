import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



import ProfileScreen from '../screens/Profile/index';
import AboutScreen from '../screens/About/index';
import HomeScreen from '../screens/Home/index';
import HomeNavigator from './HomeNavigator';
const Tab = createBottomTabNavigator();

function AppTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      statusBarStyle: 'dark',
  }}>

   

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarStyle: { height: 60 },
          tabBarIconStyle: { marginTop: 5 },
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Feather name="user" size={25} color="#0087F5" />
            ) : (
              <Feather name="user" size={25} color="#808080" />
            );
          },
        }}
      />

      <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={{
              tabBarStyle: { height: 60 },
              tabBarIconStyle: { marginTop: 5 },
              tabBarLabelStyle: { marginBottom: 5 },
              tabBarIcon: ({ focused }) => {
                return focused ? (
                  <Icon name="home" size={25} color="#0087F5" />
                ) : (
                  <Icon name="home" size={25} color="#808080" />
                );
              },
            }}
          />

      <Tab.Screen
        name="Sobre"
        component={AboutScreen}
        options={{
          tabBarStyle: { height: 60 },
          tabBarIconStyle: { marginTop: 5 },
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome5 name="exclamation-circle" size={25} color="#0087F5" />
            ) : (
              <FontAwesome5 name="exclamation-circle" size={25} color="#808080" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default AppTabNavigator;