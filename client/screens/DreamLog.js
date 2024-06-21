

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const DreamLogsScreen = () => {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dreams');
        setDreams(response.data);
      } catch (error) {
        Alert.alert('Error', 'There was an error fetching the dreams.');
        console.error(error);
      }
    };

    fetchDreams();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dream Logs</Text>
      {dreams.map((dream, index) => (
        <View key={index} style={styles.dreamItem}>
          <Text style={styles.dreamText}>Mood: {dream.mood}</Text>
          <Text style={styles.dreamText}>Theme: {dream.theme}</Text>
          <Text style={styles.dreamText}>Time: {dream.time}</Text>
          <Text style={styles.dreamText}>Duration: {dream.duration} minutes</Text>
          <Text style={styles.dreamText}>Work Before Dream: {dream.workBeforeDream}</Text>
          <Text style={styles.dreamText}>Description: {dream.dreamDescription}</Text>
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
