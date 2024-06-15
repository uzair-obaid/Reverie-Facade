import React from 'react';
import { View, StyleSheet,Image,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Header from './components/Header';
import Home from './screens/Home';
import Journal from './screens/Journal';
import Analytic from './screens/Analytic';
import Profile from './screens/auth';
import Reminder from './screens/Reminder'

import JournalLogo from './assets/journallogo'
import AnalyticsLogo from './assets/analyticslogo'
import HomeLogo from './assets/homelogo'
import ReminderLogo from './assets/Reminderlogo'
import JournalLogoFocused from './assets/journallogoFocused'
import AnalyticsLogoFocused from './assets/analyticslogoFocused'
import HomeLogoFocused from './assets/homelogoFocused'
import ReminderLogoFocused from './assets/ReminderlogoFocused'


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function CustomTabBarIcon({ route, focused, color, size }) {
  let iconComponent;
  let label;

  if (route.name === 'Home') {
    iconComponent = focused
      ? <HomeLogoFocused style={styles.icon} />
      : <HomeLogo style={styles.icon} />;
    label = 'Home';
  } else if (route.name === 'Reminder') {
    iconComponent = focused
      ? <ReminderLogoFocused style={styles.icon} />
      : <ReminderLogo style={styles.icon} />;
       label = 'Reminder';
  }
  else if (route.name === 'Analytics') {
    iconComponent = focused
      ?<AnalyticsLogoFocused style={styles.icon} />
      : <AnalyticsLogo style={styles.icon} />;
    label = 'Analytics';
  } 
  else if (route.name === 'Journal') {
    iconComponent = focused
      ? <JournalLogoFocused style={styles.icon} />
      : <JournalLogo style={styles.icon} />;
    label = 'Journal';
  } 

  return (
    <View style={[styles.iconContainer, focused && styles.focusedIconContainer]}>
      {iconComponent}
      {focused && <Text style={styles.iconLabel}>{label}</Text>}
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      {/* <Header 
        title="ReverieFacade" 
        onMenuPress={() => {
          
        }} 
        onProfilePress={()=>{
          
        }}
      /> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <CustomTabBarIcon route={route} focused={focused} color={color} size={size} />
          ),
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#4D6175',
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: 'white',
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Reminder" component={Reminder} />
        <Tab.Screen name="Journal" component={Journal} />
        <Tab.Screen name="Analytics" component={Analytic} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: 50,
    borderRadius: 10,
    flexDirection: 'row', 
  },
  
  focusedIconContainer: {
    backgroundColor: '#4D6175',
    borderRadius: 10,
  },
  iconLabel: {
    marginLeft: 8, 
    color: 'white', 
    fontWeight: 'bold',
  },
});
