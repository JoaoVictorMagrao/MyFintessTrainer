export const clickExerciseDetails = async ({idExercise , idTrainingDay , navigation}) => {
  navigation.navigate('ExerciseDetailsScreen', { idExercise, idTrainingDay});
};