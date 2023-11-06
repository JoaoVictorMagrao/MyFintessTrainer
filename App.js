import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UserProvider } from './src/context/ContextUser';
import AppNavigator from './src/routes/AppNavigator';


export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
