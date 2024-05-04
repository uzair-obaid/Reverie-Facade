import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import { SvgXml } from 'react-native-svg';
import Home from './screens/Home';
import Journal from './screens/Journal';
import Analytic from './screens/Analytic';
import Profile from './screens/Profile';
import Quiz from './screens/quiz';

const analyticSharp = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M450 128a46 46 0 00-44.11 59l-71.37 71.36a45.88 45.88 0 00-29 0l-52.91-52.91a46 46 0 10-89.12 0L75 293.88A46.08 46.08 0 10106.11 325l87.37-87.36a45.85 45.85 0 0029 0l52.92 52.92a46 46 0 1089.12 0L437 218.12A46 46 0 10450 128z"/></svg>`;
const analytic = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M456 128a40 40 0 00-37.23 54.6l-84.17 84.17a39.86 39.86 0 00-29.2 0l-60.17-60.17a40 40 0 10-74.46 0L70.6 306.77a40 40 0 1022.63 22.63L193.4 229.23a39.86 39.86 0 0029.2 0l60.17 60.17a40 40 0 1074.46 0l84.17-84.17A40 40 0 10456 128z"/></svg>`;
const journal = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M290 32H144a64.07 64.07 0 00-64 64v320a64.07 64.07 0 0064 64h146zM368 32h-18v448h18a64.07 64.07 0 0064-64V96a64.07 64.07 0 00-64-64z"/></svg>`;
const journalSharp = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M290 32H104a24 24 0 00-24 24v400a24 24 0 0024 24h186zM408 32h-58v448h58a24 24 0 0024-24V56a24 24 0 00-24-24z"/></svg>`;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Quiz" component={Quiz} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === 'Home') {
              icon = focused ? 'home-filled' : 'home'; 
              return <MaterialIcons name={icon} size={size} color={color} />;
            } else if (route.name === 'Profile') {
              icon = focused ? 'account-circle' : 'person-outline'; 
              return <MaterialIcons name={icon} size={size} color={color} />;
            } else if (route.name === 'Analytics') {
              focused?
              (icon = <SvgXml xml={analyticSharp} width={size} height={size} fill={color} />)
              : (icon = <SvgXml xml={analytic} width={size} height={size} fill={color} />)
              return icon;
            } else if (route.name === 'Journal') {
              focused?
              (icon = <SvgXml xml={journalSharp} width={size} height={size} fill={color} />)
              : (icon = <SvgXml xml={journal} width={size} height={size} fill={color} />)
              return icon;
            }
          },
          tabBarStyle: { backgroundColor: 'black' },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Journal" component={Journal} />
        <Tab.Screen name="Analytics" component={Analytic} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
