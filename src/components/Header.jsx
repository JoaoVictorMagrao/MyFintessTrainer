import { Text, StyleSheet, View } from 'react-native';

const Header = ({titleHeader}) => {
  return (
    <View style={[styles.header]}>
    <Text style={[styles.textHeader]}>{titleHeader}</Text>
  </View>
  
    );
};
const styles = StyleSheet.create({

  textHeader: {
    color: '#0087F5',
    fontWeight: 'bold',
    fontSize: 22
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 20,
    alignItems: 'center',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  body: {
    backgroundColor: 'white'
  }

});


export default Header;