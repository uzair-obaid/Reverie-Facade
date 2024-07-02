

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const DreamLogsScreen = () => {
  const [dreams, setDreams] = useState([]);
  const fetchDreams = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://192.168.43.227:5000/api/journal', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDreams(response.data.journalEntries);
    } catch (error) {
      Alert.alert('Error', 'There was an error fetching the dreams.');
      console.error(error);
    }
  };
  useEffect(()=>{
    fetchDreams();
  },[]);
  useFocusEffect(
    useCallback(() => {
      
      const getJournal = async ()=>{
        const dreamLogFlag = await AsyncStorage.getItem('dreamLogFlag');
        if(dreamLogFlag === '1'){
          fetchDreams(); 
          await AsyncStorage.setItem('dreamLogFlag','0');
        }
      }
      getJournal();
    }, []) 
  );
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {dreams.map((dream, index) => (
        <View key={index} style={styles.dreamItem}>
          <Text style={styles.dreamText}>Mood: {dream.mood}</Text>
          <Text style={styles.dreamText}>Theme: {dream.theme}</Text>
          <Text style={styles.dreamText}>Time: {dream.time}</Text>
          <Text style={styles.dreamText}>Duration: {dream.duration} minutes</Text>
          <Text style={styles.dreamText}>Task Before Dream: {dream.taskBefore}</Text>
          <Text style={styles.dreamText}>Task During Dream: {dream.taskDuring}</Text>
          <Text style={styles.dreamText}>Description: {dream.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EDF1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 10,
  },
  dreamItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  dreamText: {
    fontSize: 16,
    color: '#1F1F1F',
    marginBottom: 5,
  },
});

export default DreamLogsScreen;
