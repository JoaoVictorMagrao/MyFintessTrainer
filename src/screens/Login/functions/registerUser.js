import api from '../../../services/apiServices';
import * as SQLite from 'expo-sqlite';
export const registerUser = async ({ email, password, setUser, rememberPassword, navigation }) => {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
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
              tx.executeSql("DELETE FROM users");
                tx.executeSql("insert into users (username, password, id, email, idFicha) values (?, ?, ?, ?, ?);", [user.nome, user.senha, user.id, user.email, user.id_ficha])
          })
        }
        navigation.navigate('Home');
      } else {
        alert('erro');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
}