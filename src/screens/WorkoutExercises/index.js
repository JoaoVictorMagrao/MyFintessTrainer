import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import { showExercises } from './functions/showExercises';


function WorkoutExerciesScreen({ navigation }) {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  const route = useRoute();
  const [exercices, setExercises] = useState([]);
  useEffect(() => {
    const { id_dia_treino } = route.params;

    showExercises(id_dia_treino).then((data) => {
      setExercises(data);
    });
  }, []);
 
  //const [dataTraining, setDataTraining]  = useState([]);

//userData?.id
 //alert(userData?.id_ficha);
// alert(userData?.nome);
// alert(userData?.email);
// alert(userData?.senha);
// alert(userData?.id_ficha);



// useEffect(() => {
//  // trainingList();
//   showExercices({ db })
//   .then((data) => {
//     console.log(data);
//     setTreinos(data);
//   })
//   .catch((error) => {
//     console.error('Erro ao buscar treinos:', error);
//   });
// }, []);

  return (
    <SafeAreaView >
    <View >
     
        <View style={[styles.header]}>
          <Text style={[styles.textHeader]}>MyFitness Trainer</Text>
        </View>
        
        <View>
        <View style={styles.container}>
        {/* //  {console.log(exercices)} */}
          {exercices.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.treinoContainer}
              onPress={() => clickTrainingDay(exercise.id)}
            >
              <Text style={styles.treinoText}>{exercise.exercicio}</Text>
            </TouchableOpacity>
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
export default WorkoutExerciesScreen;