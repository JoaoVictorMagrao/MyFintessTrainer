import api from '../../../services/apiServices';
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("myfitnessTrainer.db");

export const showExercises = (idTrainingDay, idSheet) => {

  return new Promise(async (resolve, reject) => {
    db.transaction(async (tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS exercises (id INTEGER, id_dia_treino INTEGER, grupo_muscular TEXT, exercicio text);");
      // tx.executeSql('ALTER TABLE exercises ADD COLUMN grupo_muscular TEXT;');
    });

    try {
      const netInfoState = await NetInfo.fetch();
      if (netInfoState.isConnected) {

        const response = await api.get(`/listaExerciciosTreino/${idSheet}`);
        const data = response.data;

        db.transaction(async (tx) => {

          tx.executeSql('DELETE FROM exercises;');
          data.forEach(async (item) => {
            await tx.executeSql(
              'INSERT INTO exercises (id, id_dia_treino, grupo_muscular, exercicio) VALUES (?, ?, ?, ?)',
              [item.id_exercicio, item.id_dia_treino, item.descricao, item.exercicio],
              (_, result) => {

              },
              (_, error) => {
                console.error('Erro ao executar a inserção:', error);
              }
            );
          });

          tx.executeSql(

            'SELECT * FROM exercises where id_dia_treino = ?',
            [idTrainingDay],
            (_, { rows }) => {
              const exercices = rows._array;
              resolve(exercices);
            },
            (_, error) => {
              console.error('Erro ao executar a consulta SELECT:', error);
              reject(error);
            }
          );
        });
      } else {

        reject('Sem conexão de rede');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      reject(error);
    }
  });
};