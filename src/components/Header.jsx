import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { useNavigation } from '@react-navigation/native';
import { exitApp } from '../screens/Home/functions/exitApp';
const Header = ({ titleHeader, showIcon }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
      {showIcon ? (
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name='arrowleft' size={25} color='#0087F5' style={styles.icon} />    
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => exitApp(navigation)}>
          <IconSimpleLineIcons name='logout' size={25} color='#0087F5' style={styles.icon} />
        </TouchableOpacity>
      )}
      </View>
    
      <View style={styles.mainTextHeader}>
        <Text style={styles.textHeader}>{titleHeader}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    color: '#0087F5',
    fontWeight: 'bold',
    fontSize: 22,
  },
  mainTextHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    borderRadius: 50,
    height: 30,
    top: 20,
    left: 20, 
  },
});

export default Header;