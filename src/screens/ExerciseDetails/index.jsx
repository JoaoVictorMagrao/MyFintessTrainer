import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import { showExerciseDetails } from './functions/showExerciseDetails';
import Header from '../../components/Header';
import { UserContext } from '../../context/ContextUser';
import { useContext } from 'react';

function ExerciseDetailsScreen({ navigation }) {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  const route = useRoute();
  const { userData } = useContext(UserContext);
  // if (!userData) {
  //   return null;
  // }
  const [exerciceDetails, setExerciseDetails] = useState([]);
  useEffect(() => {
    const { idExercise, idTrainingDay } = route.params;
    //console.log('userData?.id_ficha:', userData?.id_ficha);
    showExerciseDetails(idExercise, idTrainingDay, userData?.id_ficha).then((data) => {
      setExerciseDetails(data);
    });
  }, [userData]);



  return (
    <SafeAreaView style={styles.page}>
      <View >
        <Header titleHeader={"Detalhes Exercício"} showIcon={true} />

        {exerciceDetails.map((exercise) => (
          <View
            key={exercise.id_exercicio}
            style={styles.container}
          >

            <View style={styles.cardExercise}>
              <Text style={styles.exerciseText}>{exercise.exercicio}</Text>
            </View>



            <View style={styles.cardInfoExercise}>
              <Text style={styles.titlo}>Séries: {exercise.series}</Text>
            </View>

            <View style={styles.cardInfoExercise}>
              <Text style={styles.titlo}>Repetições: {exercise.repeticoes}</Text>
            </View>

            <View style={styles.cardInfoExercise}>
              <Text style={styles.titlo}>Carga: {exercise.carga}</Text>
            </View>

            <View style={styles.cardInfoExercise}>
              <Text style={styles.titlo}>Repouso: {(exercise.descanso >= 60) ? (exercise.descanso / 60).toFixed(2).replace('.00', '') + ' Minutos' : exercise.descanso + ' Segundos'}</Text>
            </View>

            {exercise.descricao ? (
              <View style={styles.cardObs}>
                <Text style={styles.textDescriptionObs}>Observação do exercício</Text>
                <Text>{exercise.descricao}</Text>
              </View>
            ) : null}

          </View>
        ))}
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
  cardInfoExercise: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: '#808080',
    paddingLeft: 15,
    marginTop: 35
  },
  titlo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5
  },
  cardObs: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 6,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 100
  },

  textDescriptionObs: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  alignCenter: {
    alignItems: 'center',
    marginTop: 20,
  },
  cardExercise: {
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 15
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});
export default ExerciseDetailsScreen;