import * as SQLite from 'expo-sqlite';
import { useUserContext } from '../context/ContextUser';

const db = SQLite.openDatabase("myfitnessTrainer.db");
  
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS treinos (id INTEGER, id_exercicio INTEGER, id_dia_treino INTEGER, id_grupo_muscular INTEGER, id_ficha INTEGER);"
    );
  });

  
  // export const formatCnpjCpf = function (value) {
  //   const cnpjCpf = value.replace(/\D/g, '')
  
  //   if(cnpjCpf.length === 11){
  //     return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  //   }
  //   return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3-$4')
  // }
  
 
  // const { userData } = useUserContext();
  // // alert('ID DO USUARIO ' + userData?.id);

  
 
 
  



//createDatabase();