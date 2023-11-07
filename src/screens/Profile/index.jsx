import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';
import { useRoute } from '@react-navigation/native';
import { showDetailsProfile } from './functions/showDetailsProfile';
import { formatarData, formatarDinheiro } from '../../Util/util';
import Feather from 'react-native-vector-icons/Feather';

import { exitApp } from './functions/exitApp';
import Header from '../../components/Header';
import Toast from 'react-native-toast-message';
import { color } from 'react-native-elements/dist/helpers';

function ProfileScreen({ navigation }) {
  const db = SQLite.openDatabase("myfitnessTrainer.db");
  const [detailsProfile, setDetailsProfile] = useState([]);

  useEffect(() => {
    showDetailsProfile(150).then((data) => {
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
                <View style={styles.cardIconProfile}> 
                  <Feather name="user" size={155} color="#0087F5" />

                  <View style={styles.cardNameStudent}>
                    <Text style={styles.textNameStudent}>{profile.nameStudent}</Text>
                  </View>
                </View>
               
               
                <View  style={styles.cardInfoProfile}>
                  <Text style={styles.titlo}>Data Vencimento:</Text>
                  <Text style={styles.textProfile}>{formatarData(profile.dueDate)}</Text>
                </View>

                <View  style={styles.cardInfoProfile}>
                  <Text style={styles.titlo}>Valor Mensal:</Text>
                  <Text style={styles.textProfile}>R$ {formatarDinheiro(profile.monthlyValue)}</Text>
                </View>

                <View  style={styles.cardInfoProfile}>
                  <Text style={styles.titlo}>Ficha: </Text>
                  <Text style={styles.textProfile}>{profile.nameSheet}</Text>
                </View>

                <View  style={styles.cardInfoProfile}>
                  <Text style={styles.titlo}>Professor: </Text>
                  <Text style={styles.textProfile}>{profile.nameTeacher}</Text>
                </View>

                <View style={styles.logout}>
                  <Button style={styles.buttonLogout} color="red" title="Sair da conta" onPress={() => exitApp(navigation)}/>
                </View>
  
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
  titlo: {
    color: 'black',
    fontWeight: 'bold'
  },
  logout: {
    marginTop: 150
  },
  cardIconProfile: {

    padding: 10,
    alignItems: 'center',
  },
  cardNameStudent: {

    alignItems: 'center',
    padding: 15

  },
  textNameStudent: {
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#0087F5',
    color: '#0087F5'

  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardInfoProfile: {
    width: '100%',
    borderBottomWidth: 1, 
    borderColor: '#808080', 
    padding: 5,
  },
  profileContainer: {
    width: '100%',
    padding: 15,
    paddingLeft: 20
  },
  text: {
    color: '#808080'
  },
  textProfile: {
    color: 'black'
  }

});
export default ProfileScreen;