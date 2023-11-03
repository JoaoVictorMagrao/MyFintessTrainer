import { Text, StyleSheet, View, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Header = ({ titleHeader }) => {
  const navigation = useNavigation(); 

  const handleGoBack = () => {
    navigation.goBack(); 
  };
  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.iconContainer}>
          <Icon name='arrowleft' size={25} color='#0087F5' style={styles.icon} />
        </TouchableOpacity>
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
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    alignItems: 'center'
  },
  icon: {
    borderWidth: 2, 
    borderColor: '#0087F5',
    borderRadius: 50,
    height: 30,
    alignItems: 'center',
    display: 'flex',
  }
});

export default Header;