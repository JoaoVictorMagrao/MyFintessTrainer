import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import { showDetailsProfile } from './functions/showDetailsProfile';
import { formatarData, formatarDinheiro } from '../../Util/util';

import Header from '../../components/Header';
import Toast from 'react-native-toast-message';
import { color } from 'react-native-elements/dist/helpers';

function ProfileScreen({ navigation }) {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  const [detailsProfile, setDetailsProfile] = useState([]);

  useEffect(() => {
    showDetailsProfile(79).then((data) => {
      setDetailsProfile(data);
    });
  }, []);
 

  return (
    <SafeAreaView style={styles.page} >
      <Toast />
    <View >
    <Header titleHeader={"Perfil"} showIcon={true}/>
        <View>
        <View style={styles.container}>
          {detailsProfile.map((profile) => (
            <View
              key={1}
              style={styles.profileContainer}
            >
              <View>
                <View style={styles.cardNameStudent}>
                  <Text style={styles.textNameStudent}>{profile.nameStudent}</Text>
                </View>
               
                <View  style={styles.cardPayment}>
                  <Text style={styles.textPayment}>Data Vencimento: {formatarData(profile.dueDate)}</Text>
                  <Text style={styles.textPayment}>Valor Mensal: R$ {formatarDinheiro(profile.monthlyValue)}</Text>
                </View>
                

                <Text style={styles.text}>{profile.nameSheet}</Text>
                <Text style={styles.text}>{profile.nameTeacher}</Text>
                
              </View>
            </View>
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
  cardNameStudent: {

    alignItems: 'center',
    padding: 15

  },
  textNameStudent: {
    fontWeight: 'bold',
    fontSize: 18

  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardPayment: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 5
  },
  profileContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    padding: 15,
    paddingLeft: 20
  },
  text: {
    color: '#808080'
  },
  textPayment: {
    color: 'black'
  }

});
export default ProfileScreen;