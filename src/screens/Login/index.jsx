import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, CheckBox } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { UserContext } from '../../context/ContextUser';
import * as SQLite from 'expo-sqlite';
import { registerUser } from './functions/registerUser';
import { LoginUser } from './functions/loginUser';


function openDatabase() {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  return db;
}

const db = openDatabase();
db.transaction(tx => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS users (userName TEXT, password TEXT, id INTEGER, email TEXT, showPassword TEXT, idFicha INTEGER);"
  );
});


// db.transaction((tx) => {
//   tx.executeSql(
//     "ALTER TABLE users ADD COLUMN idFicha TEXT",
//     [],
//     (_, results) => {
//       // A coluna "email" foi adicionada com sucesso
//       console.log('A coluna "idFicha" foi adicionada com sucesso');
//     },
//     (_, error) => {
//       // Erro ao adicionar a coluna "email"
//       console.error('Erro ao adicionar a coluna "id_ficha":', error);
//     }
//   );
// });
function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    // console.log(userData);
    handleLogin();
    console.log('terste');
  }, []);

  const handleLogin = () => {
    LoginUser({
      db,
      setUser: setUserData,
      navigation,
      handleLoginAsync
    })
  };


  const handleLoginAsync = async () => {
    // console.log(user);
    registerUser({
      email,
      password,
      setUser: setUserData,
      rememberPassword,
      navigation,
      db
    })
  };

  return (
    <View style={styles.container}>
      <Toast />
      <Input
        placeholder="Email"
        rightIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <Input
        placeholder="Senha"
        rightIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <CheckBox
        title="Lembrar senha"
        checked={rememberPassword}
        onPress={() => setRememberPassword(!rememberPassword)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}

      />
      <Button
        title="Login"
        onPress={handleLoginAsync}
        buttonStyle={styles.loginButton}
      />

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('Cadastro')}
      >
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  checkboxText: {
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  titleCor: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0087F5'
  },
  loginButton: {
    backgroundColor: '#0087F5',
    height: 50,
    marginTop: 20,
  },
  signupButton: {
    marginTop: 20,
  },
  signupText: {
    textAlign: 'center',
    color: 'blue',
  },
});

export default LoginScreen;