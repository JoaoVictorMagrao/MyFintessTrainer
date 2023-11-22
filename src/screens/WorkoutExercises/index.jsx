import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import { showExercises } from './functions/showExercises';
import { clickExerciseDetails } from './functions/clickExerciseDetails';
import { UserContext } from '../../context/ContextUser';
import { useContext } from 'react';
import Header from '../../components/Header';
import Toast from 'react-native-toast-message';

function WorkoutExerciesScreen({ navigation }) {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  const route = useRoute();
  const { userData } = useContext(UserContext);
  const [exercices, setExercises] = useState([]);
  useEffect(() => {
    const { id_dia_treino } = route.params;

    showExercises(id_dia_treino, userData?.id_ficha).then((data) => {
      setExercises(data);
    });
  }, []);


  return (
    <SafeAreaView style={styles.page} >
      <Toast />
      <View >
        <Header titleHeader={"Exercicíos"} showIcon={true} />
        <View>
          <View style={styles.container}>
            {exercices.map((exercise) => (

              <TouchableOpacity
                key={exercise.id}
                style={styles.treinoContainer}
                onPress={() => clickExerciseDetails({ idExercise: exercise.id, idTrainingDay: exercise.id_dia_treino, navigation })}
              >
                <View>
                  <Text style={styles.treinoText}>{exercise.exercicio}</Text>
                  <Text style={styles.grupoMuscularText}>{exercise.grupo_muscular}</Text>
                </View>
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
  grupoMuscularText: {
    color: '#808080'
  }

});
export default WorkoutExerciesScreen;