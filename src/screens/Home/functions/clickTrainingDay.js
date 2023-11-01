export const clickTrainingDay = async ({id_dia_treino, navigation}) => {
  navigation.navigate('WorkoutExercies', { id_dia_treino });
};