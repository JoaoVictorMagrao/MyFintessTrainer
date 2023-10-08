import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView  } from 'react-native';
import { useUserContext } from '../context/ContextUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import NetInfo from "@react-native-community/netinfo";
//import { createDataBdTreino } from '../SQLite/treinos';
import api from '../services/apiServices';

function HomeScreen({ navigation }) {
  const { userData } = useUserContext();
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  const [treinos, setTreinos] = useState([]);
  //const [dataTraining, setDataTraining]  = useState([]);
//userData?.id
// alert(userData?.id);
// alert(userData?.nome);
// alert(userData?.email);
// alert(userData?.senha);
// alert(userData?.id_ficha);

const fetchTreinos = () => {
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
const handleTraining = async () => {
  try {
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      const response = await api.get(`/listaTreinosAluno/${userData?.id_ficha}`);
      const data = response.data;

      db.transaction((tx) => {
        tx.executeSql(
        'DELETE FROM treinos;'
        );
        data.forEach((item) => {
          tx.executeSql(
            'INSERT INTO treinos (id, id_exercicio, id_dia_treino, id_grupo_muscular, id_ficha) VALUES (?, ?, ?, ?, ?)',
            [item.id, item.id_exercicio, item.id_dia_treino, item.id_grupo_muscular, item.id_ficha]
          );
        });
      });
     // setDataTraining(data);
  }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};
useEffect(() => {
  handleTraining();
  fetchTreinos()
  .then((data) => {
    console.log(data);
    setTreinos(data);
  })
  .catch((error) => {
    console.error('Erro ao buscar treinos:', error);
  });
}, []);

const trainingDay = {
  1: 'Treino G',
  2: 'Treino A',
  3: 'Treino B',
  4: 'Treino C',
  5: 'Treino D',
  6: 'Treino E',
  7: 'Treino F',
};

  return (
    <SafeAreaView >
    <View >
     
        <View style={[styles.header]}>
          <Text style={[styles.textHeader]}>MyFitness Trainer</Text>
        </View>

        <View>
        <View style={styles.container}>
          {treinos.map((treino) => (
            <View key={treino.id} style={styles.treinoContainer}>
              <Text style={styles.treinoText}>{trainingDay[treino.id_dia_treino]}</Text>
            </View>
          ))}
      </View>
    </View>
      {/* <Button
        title="Go to DetailsSSSSSSS"
        onPress={() => navigation.navigate('Login')}
      /> */}
    </View>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  treinoContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '90%'
  },
  treinoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue', 
  },
  textHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  },
  header: {
    backgroundColor: '#0087F5',
    paddingVertical: 20,
    alignItems: 'center'
  },
  statusIndicator: {
    width: 16, 
    height: 16, 
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#0087F5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },

});
export default HomeScreen;