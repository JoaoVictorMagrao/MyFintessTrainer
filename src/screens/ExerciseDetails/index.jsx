import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import { showExerciseDetails } from './functions/showExerciseDetails';
import Header from '../../components/Header';

function ExerciseDetailsScreen({ navigation }) {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  const route = useRoute();
  const [exerciceDetails, setExerciseDetails] = useState([]);
  useEffect(() => {
    const { idExercise, idTrainingDay } = route.params;

    showExerciseDetails(idExercise, idTrainingDay).then((data) => {
      setExerciseDetails(data);
    });
  }, []);
 


  return (
    <SafeAreaView style={styles.page}>
      <View >
        <Header titleHeader={"Detalhes Exercício"} showIcon={true}/>
        
        {exerciceDetails.map((exercise) => (
              <View
                key={exercise.id_exercicio}
              >
                <View style={styles.alignCenter}>
                  <View style={styles.cardExercise}>
                    <Text style={styles.exerciseText}>{exercise.exercicio}</Text>
                  </View>
                </View>
                
                <View style={styles.alignCenter}>
                  <View style={styles.cardDetailsExercise}>
                    <View style={styles.textContainer}>
                      <View style={styles.textItemContainer}>
                        <Text style={styles.textItem}>{exercise.carga} KG</Text>
                        <Text style={styles.textTitle}>Carga</Text>
                      </View>
                      <View style={styles.textItemContainer}>
                        <Text style={styles.textItem}>{exercise.series}</Text>
                        <Text style={styles.textTitle}>Séries</Text>
                      </View>
                      <View style={styles.textItemContainer}>
                        <Text style={styles.textItem}>{exercise.repeticoes}</Text>
                        <Text style={styles.textTitle}>Repetições</Text>
                      </View>
                      <View style={styles.textItemContainer}>
                      <Text style={styles.textItem}>{(exercise.descanso >= 60) ? (exercise.descanso / 60).toFixed(2) + ' (M)' : exercise.descanso + ' (S)'}</Text>
                        <Text style={styles.textTitle}>Repouso</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.alignCenter}>
                  <View style={styles.cardObs}>
                    <Text style={styles.textDescriptionObs}>Observação do exercício</Text>
                    <Text>{exercise.descricao}</Text>
                  </View>
                </View>
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
  cardDetailsExercise: {
    width: '90%',
    borderColor: '#d3d3d3',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textItem: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 50,
    padding: 10,
    margin: 5,
    textAlign: 'center',
  },
  cardObs: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 6,
    paddingLeft: 20,
    borderRadius: 10
  },
  textTitle: {
    marginTop: 5,
    textAlign: 'center',
  },
  textDescriptionObs: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  alignCenter: {
    alignItems: 'center',
    marginTop: 20
  },
  cardExercise: {
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 10
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: 'bold', 
  }
});
export default ExerciseDetailsScreen;