import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView  } from 'react-native';
import { useUserContext } from '../context/ContextUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import  createDataBdTreino  from '../SQLite/treinos';
import api from '../services/apiServices';

function HomeScreen({ navigation }) {
  const { userData } = useUserContext();
  const [dataTraining, setDataTraining]  = useState([]);
//userData?.id
alert(userData?.id);
alert(userData?.nome);
alert(userData?.email);
alert(userData?.senha);
alert(userData?.id_ficha);
useEffect(() => {
 // createDataBdTreino(); 


  
}, []);

  return (
    <SafeAreaView >
    <View >
     
        <View style={[styles.header]}>
          <Text style={[styles.textHeader]}>MyFitness Trainer</Text>
        </View>
     
      {/* <ScrollView contentContainerStyle={styles.container}>
        {dataTraining.map((training, index) => (
          
          <View key={training.id} style={styles.card}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor: training.ativo === 1 ? 'green' : 'red',
                position: 'absolute', // Define a posição absoluta
                top: 5, // Alinha no topo
                left: 5, // Alinha à esquerda
                width: 16, // Largura absoluta
                height: 16, // Altura absoluta
                borderRadius: 8, // Borda arredondada para criar uma bolinha
              },
            ]}
          />
          <Text style={styles.cardTitle}>{training.nome_ficha}</Text>
        </View>
        
        ))}
        </ScrollView> */}
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