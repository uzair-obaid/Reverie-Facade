import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProfileLogo from '../assets/profile';
import MenuLogo from '../assets/menulogo';




const Header = ({ title, onProfilePress, onMenuPress}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onMenuPress} >
        <MenuLogo/>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity  onPress={onProfilePress}>
        <ProfileLogo/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop:30,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ABCACF',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});

export default Header;
