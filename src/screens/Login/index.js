import React, { useState, useEffect  } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, CheckBox  } from 'react-native-elements';
import api from '../../services/apiServices';
import Toast from 'react-native-toast-message';
import { useUserContext } from '../../context/ContextUser';
import * as SQLite from 'expo-sqlite';


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
  const { setUser } = useUserContext();
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    handleLogin();
  }, []); 

  const handleLogin = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT email, password, id, idFicha, userName FROM users",
        [],
        (_, results) => {        
          var len = results.rows.length;

          if (len > 0) { 
            const userObject = {
              email: results.rows.item(0).email,
              id: results.rows.item(0).id,
              id_ficha: results.rows.item(0).idFicha,
              nome: results.rows.item(0).userName,
              senha: results.rows.item(0).password
            };

            console.log(userObject);
            setUser(userObject);
              navigation.navigate('Home');
          } else {
              handleLoginAsync();
          }
        },
        (_, error) => {
          // Callback de erro
          console.error('Erro ao executar o SELECT: ', error);
        }
      );
    });
  };
  

  const handleLoginAsync = async () => {

    try {
      const response = await api.post('/loginAluno', {
        email: email,
        senha: password
      });
  
      if (response.data.msg === 'OK') {
        const user = response.data.user;
        setUser(user);
        if (rememberPassword){
        
          db.transaction((tx) => {
              tx.executeSql("DELETE FROM users;");
                tx.executeSql("insert into users (username, password, id, email, idFicha) values (?, ?, ?, ?, ?);", [user.nome, user.senha, user.id, user.email, user.id_ficha])
          })
        }
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Credenciais incorretas',
          text2: 'Verifique seu email e senha e tente novamente.',
          visibilityTime: 3000, // Tempo de exibição do toast em milissegundos
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        MyFitness{'\n'}
        <Text style={styles.titleCor}>Trainer</Text>
      </Text>

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
  titleCor:{
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