import * as SQLite from 'expo-sqlite';

export const exitApp = (navigation, setUserData) => {

  const db = SQLite.openDatabase("myfitnessTrainer.db");

  db.transaction((tx) => {
    tx.executeSql('DELETE FROM users', [], (_, result) => {
      setUserData(null);
      navigation.navigate('Login');
    },
      (_, error) => {
        console.error('Erro tentar sair do app', error);
      });
  });

};