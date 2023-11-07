import api from '../../../services/apiServices';
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("myfitnessTrainer.db");

export const showDetailsProfile = (idAluno) => {

  return new Promise(async (resolve, reject) => {
    db.transaction(async (tx) => {
      //tx.executeSql("DROP TABLE profile;");
      tx.executeSql("CREATE TABLE IF NOT EXISTS profile (nameStudent text, monthlyValue FLOAT, dueDate TEXT, dateRegister TEXT, nameTeacher TEXT, nameSheet TEXT);");
      // tx.executeSql("PRAGMA table_info(profile);", [], (_, result) => {
      //   const columnInfo = result.rows._array;
      
      //   if (columnInfo.length > 0) {
      //     let alertMessage = "Colunas da tabela 'profile':\n";
      
      //     columnInfo.forEach((column) => {
      //       alertMessage += `Nome: ${column.name}\n`;
      //       alertMessage += `Tipo de Dado: ${column.type}\n`;
      //       alertMessage += `Chave Primária: ${column.pk ? 'Sim' : 'Não'}\n\n`;
      //     });
      
      //     // Exibir a mensagem de alerta
      //     alert(alertMessage);
      //   } else {
      //     alert('A tabela "profile" não possui colunas.');
      //   }
      // }, (_, error) => {
      //   console.error('Erro ao consultar informações da tabela:', error);
      // });
    });

    try {
      const netInfoState = await NetInfo.fetch();
      if (netInfoState.isConnected) {
        
        const response = await api.get(`/perfilAluno/${idAluno}`);
        const data = response.data;

        db.transaction(async (tx) => {
        if(data.status){
          tx.executeSql('DELETE FROM profile;');
        //  console.log(data);
  //console.log(item);
            tx.executeSql(
              'INSERT INTO profile (nameStudent, monthlyValue, dueDate, dateRegister, nameTeacher, nameSheet) VALUES (?, ?, ?, ?, ?, ?)',
              [
                data.resultado[0].nome,
                data.resultado[0].valor_mensal,
                data.resultado[0].data_vencimento,
                data.resultado[0].data_cadastro,
                data.resultado[0].nome_professor,
                data.resultado[0].nome_ficha,
              ],
              (_, result) => {
              
              },
              (_, error) => {
                console.error('Erro ao executar a inserção:', error);
              }
            );
       
        }else{
          alert('Erro ao buscar os dados do perfil');
        }
        tx.executeSql(
          'SELECT * FROM profile',
          [],
          (_, { rows }) => {
            const profile = rows._array;
            resolve(profile); 
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