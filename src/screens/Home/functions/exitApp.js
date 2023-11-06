import * as SQLite from 'expo-sqlite';

export const exitApp = (navigation) => {

  const db = SQLite.openDatabase("myfitnessTrainer.db");

    db.transaction((tx) => {
      tx.executeSql('DELETE FROM users', [], (_, result) => {
        navigation.navigate('Login');
      },
      (_, error) => {
        console.error('Erro tentar sair do app', error);
      });
    });

};