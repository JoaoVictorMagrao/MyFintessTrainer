import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Image  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '../../img/logoApp.png';
import Header from '../../components/Header';



function AboutScreen() {

  return (
    <SafeAreaView style={styles.page} >
      <View>
        <Header titleHeader={"Sobre"} showIcon={true}/>
        <View style={styles.cardLogo}>
          <Image
            source={Logo}
            style={styles.logo}
          />
          <View style={styles.cardNameApp}>
            <Text style={styles.textNameApp}>My Fintess Trainer</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}></View>
        </View>
        <View style={styles.cardVersion}>
          <Text style={styles.textVersion}>Versão: 1.0.0</Text>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>E-mail: appMyFitnessTrainer@gmail.com</Text>
          <Text style={styles.contactLabel}>Telefone: (14) 456-7890</Text>
        </View>

        <View style={styles.descriptionApp}>
          <Text style={styles.descriptionLabel}>Descrição</Text>
          <Text style={styles.description}>Aplicativo desenvolvido pelo João Victor Magrão, aonde a função é a visualição do seu treino de musculação.</Text>
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
  descriptionApp:{
    padding: 15
  },
  descriptionLabel: {
    fontSize: 20
  },
  description: {
    fontSize: 18,
    marginLeft: 10
  },
  textNameApp: {
    fontSize: 20,
    color: '#0087F5',
    fontWeight: 'bold',
  },
  cardNameApp: {
    borderBottomWidth: 1,
    borderBottomColor: '#0087F5',
    marginBottom: 15
  },
  logo: {
    width: 200,
    height: 200,
  },
  cardLogo: {
    alignItems: 'center',
  },
  cardVersion: {
    padding: 15
  },
  textVersion: {
    fontSize: 18
  },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  row: {
    borderBottomWidth: 1,
    borderColor: '#0087F5', 
    width: '100%', 
  },
  contactInfo: {
    padding: 15,
  },
  contactLabel: {
    fontSize: 18,
  },

});
export default AboutScreen;