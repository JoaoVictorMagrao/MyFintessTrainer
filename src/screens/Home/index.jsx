import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { showTraining } from './functions/showTraining';
import { trainingList } from './functions/trainingList';
import { clickTrainingDay} from './functions/clickTrainingDay';
import Header from '../../components/Header';
import Toast from 'react-native-toast-message';

function HomeScreen({ navigation }) {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  const [treinos, setTreinos] = useState([]);
 
  //const [dataTraining, setDataTraining]  = useState([]);

//userData?.id
 //alert(userData?.id_ficha);
// alert(userData?.nome);
// alert(userData?.email);
// alert(userData?.senha);
// alert(userData?.id_ficha);



useEffect(() => {
  trainingList();
  showTraining({ db })
  .then((data) => {
    setTreinos(data);
  })
  .catch((error) => {
    Toast.show({
      type: 'error',
      text1: 'Credenciais incorretas',
      text2: 'Erro ao buscar treinos:', error,
      visibilityTime: 3000, // Tempo de exibição do toast em milissegundos
    });
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
    <SafeAreaView style={styles.page}>
      <Toast />
    <View >
      <Header titleHeader={"Meus Treinos"}/>
        <View>
          <View style={styles.container}>
            {/* {console.log(treinos)} */}
            {treinos.map((treino) => (
              <TouchableOpacity
                key={treino.id}
                style={styles.treinoContainer}
                onPress={() => clickTrainingDay({ id_dia_treino: treino.id_dia_treino, navigation })}
              >
                <Text style={styles.treinoText}>{trainingDay[treino.id_dia_treino]}</Text>
              </TouchableOpacity>
            ))}
          </View>
      </View>
    </View>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  treinoContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    padding: 15,
    paddingLeft: 20
  },
  treinoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', 
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