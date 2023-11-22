import * as SQLite from 'expo-sqlite';

const LoginUser = new Promise((resolve, reject) => {
  const db = SQLite.openDatabase("myfitnessTrainer.db");

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
            id_ficha: parseInt(results.rows.item(0).idFicha),
            nome: results.rows.item(0).userName,
            senha: results.rows.item(0).password
          };
          resolve(userObject);

        } else {
          resolve(null)
        }
      },
      (_, error) => {
        reject(error);
      }
    );
  });

})
const useSession = () => {
  return {
    verify: LoginUser
  }
}
export default useSession;
