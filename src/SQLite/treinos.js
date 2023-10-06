import * as SQLite from 'expo-sqlite';
import { useUserContext } from '../context/ContextUser';


export function createDataBdTreino() {
  const { userData } = useUserContext();
  //console.log(userData?.id);

  const db = SQLite.openDatabase("myfitnessTrainer.db");
  // const handleTraining = async () => {
  //   try {
  //     const response = await api.get(`/listaTreinosAluno/${userData?.id}`);
  //     setDataTraining(response.data);
  //   } catch (error) {
  //     console.error('Erro na requisição:', error);
  //   }
  // };
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS treinos (id INTEGER, id_exercicio INTEGER, id_dia_treino INTEGER, id_grupo_muscular INTEGER, id_ficha INTEGER);"
    );
  });
  return '123';
}

//createDatabase();