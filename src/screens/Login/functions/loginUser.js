export const LoginUser = ({ db, setUser, navigation, handleLoginAsync }) => {
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

                    setUser(userObject);
                    navigation.navigate('Home');
                } else {
                    handleLoginAsync();
                }
            },
            (_, error) => {
                console.error('Erro ao executar o SELECT: ', error);
            }
        );
    });
}