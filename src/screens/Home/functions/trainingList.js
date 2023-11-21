import api from '../../../services/apiServices';
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("myfitnessTrainer.db");
//const { userData } = useUserContext();

export const trainingList = async (idSheet) => {
  
 // alert(userData?.id_ficha);

  try {
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      
      const response = await api.get(`/listaTreinosAluno/${idSheet}`);
      const data = response.data;

      db.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS treinos (id INTEGER, id_exercicio INTEGER, id_dia_treino INTEGER, id_grupo_muscular INTEGER, id_ficha INTEGER);"
          );
          tx.executeSql('DELETE FROM treinos', [], (_, result) => {
          },
          (_, error) => {
            console.error('Erro ao excluir tabela treinos:', error);
          });
          
       
        data.forEach((item) => {
          tx.executeSql(
            'INSERT INTO treinos (id, id_exercicio, id_dia_treino, id_grupo_muscular, id_ficha) VALUES (?, ?, ?, ?, ?)',
            [item.id, item.id_exercicio, item.id_dia_treino, item.id_grupo_muscular, item.id_ficha],
            (_, result) => {
              // console.log('Query executada com sucesso:', result);
            },
            (_, error) => {
              console.error('Erro ao executar a query:', error);
            }
          );
        });
      });
     // setDataTraining(data);
  }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};