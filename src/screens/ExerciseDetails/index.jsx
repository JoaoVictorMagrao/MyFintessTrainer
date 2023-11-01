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
    <SafeAreaView >
      <View >
        <Header titleHeader={"Detalhes Exercício"}/>
        
        {exerciceDetails.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
             
              >
                <Text>{exercise.exercicio}</Text>
              </TouchableOpacity>
            ))}
      </View>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  
});
export default ExerciseDetailsScreen;