import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert('123');
    // Aqui você pode adicionar a lógica de autenticação
    // Por exemplo, verificar se o email e a senha são válidos

    // Se a autenticação for bem-sucedida, você pode navegar para a próxima tela
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        MyFitness{'\n'}
        <Text style={styles.titleCor}>Trainer</Text>
      </Text>

      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <Input
        placeholder="Senha"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.loginButton}
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('EsqueciMinhaSenha')}
      >

      </TouchableOpacity>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  titleCor:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0087F5'
  },
  loginButton: {
    backgroundColor: '#0087F5',
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