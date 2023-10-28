export const showTraining = ({ db }) => {
  
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
     
      tx.executeSql(
        'SELECT * FROM treinos',
        [],
        (_, { rows }) => {

          const treinos = rows._array; 
          resolve(treinos);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};