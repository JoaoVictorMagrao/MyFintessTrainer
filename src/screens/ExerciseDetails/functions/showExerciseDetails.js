import api from '../../../services/apiServices';
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("myfitnessTrainer.db");

export const showExerciseDetails = (idExercise, idTrainingDay) => {

  return new Promise(async (resolve, reject) => {
    db.transaction(async (tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS exercisesDetails (id_dia_treino INTEGER, descanso INTEGER, carga INTEGER, repeticoes INTEGER, exercicio text, id_exercicio INTEGER, descricao text);");
      // tx.executeSql('ALTER TABLE exercises ADD COLUMN grupo_muscular TEXT;');
    });

    try {
      const netInfoState = await NetInfo.fetch();
      if (netInfoState.isConnected) {
        
        const response = await api.get(`/listaExerciciosTreino/123`);
        const data = response.data;

        db.transaction(async (tx) => {

          tx.executeSql('DELETE FROM exercisesDetails;');
            data.forEach(async (item) => {
              await tx.executeSql(
                'INSERT INTO exercisesDetails (id_dia_treino, descanso, carga, repeticoes, exercicio, id_exercicio, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [item.id_dia_treino, item.descanso, item.carga, item.repeticoes, item.exercicio, item.id_exercicio, item.descricao],
                (_, result) => {
        
                },
                (_, error) => {
                  console.error('Erro ao executar a inserção:', error);
                }
              );
            });

          tx.executeSql(
            'SELECT * FROM exercisesDetails WHERE id_dia_treino = ? AND id_exercicio = ?',
            [idTrainingDay, idExercise],
            (_, { rows }) => {
              const exercice = rows._array;
              resolve(exercice); 
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